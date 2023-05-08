import React, { useEffect, useState } from 'react'
import LeftMenu from '../LeftMenu/LeftMenu'
import styles from './DatingPage.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DatingPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({})
  const [userImage, setUserImage] = useState()

  const [currentProfile, setCurrentProfile] = useState({})


  function skipProfile(){ // событие для кнопки Пропустить
    console.log("skip");
      axios.post(`http://localhost:3050/markAsViewed`,{ //запрос на установку пометки "Просмотрено" на просмотренный профиль
        id_viewed: currentProfile.id_user, //кого просмотрели
        id_viewing: userInfo.id_user //кто просмотрел
      })
      .then((res)=>{
      console.log(res);
      
      axios.get(`http://localhost:3050/getAvailableProfile`, { //поиск следующего доступного профиля в базе
      params: {
        currentUserId: userInfo.id_user,
        lookFor: userInfo.gender == "Мужской" ? "Женский" : "Мужской"
      }
    }).then((resp)=>{
        console.log(resp.data.result);
        if(resp.data.result.length != 0){ //если найден подходящий профиль, то заполняется переменная currentProfile
          setCurrentProfile(resp.data.result[0])
        }else{  //если подходящий профиль не найден, то выводится предупреждающее сообщение и происходит переход на страницу личного кабинета пользователя
          alert("Анкеты закончились!")
          navigate("/profile")
        }

      })
    })

    
  }
  function addToFavorite(){
    console.log("favorite");
  }
  function writeMessage(){
    console.log("message");
  }
  function likeProfile(){
    console.log("like");
  }

  useEffect(()=>{ //useEffect, который проверяет, авторизован ли пользователь, перешедший на страницу /dating, используя данные их localStorage
    let localLogin = localStorage.getItem('login')
    let localPassword = localStorage.getItem('password')

    axios.get(`http://localhost:3050/getUserByPhone/${localLogin}`)
    .then((resp)=>{
      console.log(resp);
      if(resp.status === 204 || resp.data[0].password != localPassword){
        navigate('/authorization')
      }
      setUserInfo(resp.data[0])
    })
    
  },[])


function getNewProfile(){// функция поиска следующей подходящей анкеты
  if(userInfo.id_user != undefined){
    axios.get(`http://localhost:3050/getAvailableProfile`, {
      params: {
        currentUserId: userInfo.id_user,
        lookFor: userInfo.gender == "Мужской" ? "Женский" : "Мужской"
      }
    })
    .then((resp)=>{
      console.log(resp.data.result);
      if(resp.data.result != 0){
        setCurrentProfile(resp.data.result[0]) //если найден подходящий профиль, то заполняется переменная currentProfile
      }else{ //если подходящий профиль не найден, то выводится предупреждающее сообщение и происходит переход на страницу личного кабинета пользователя
        alert("Анкеты закончились")
        navigate("/profile")
      }
    })
  }
}
  useEffect(()=>{ //useEffect, который вызывает функцию getNewProfile при получении данных о пользователе
    console.log(userInfo);
    if(userInfo.id_user != undefined){
      getNewProfile()
    }
  },[userInfo])

  useEffect(()=>{//useEffect, который заполняет переменную userImage, хранящую аватарку отображаемой на данный момент анкеты
    fetch(`http://localhost:3050/getUserAvatar/${currentProfile.id_user}`)
    .then(async(resp)=>{
      resp.blob()
      .then((blob)=>{
        setUserImage(URL.createObjectURL(blob));
      })
    })
  },[currentProfile])

  return (
    <div className={styles.datingPage}>
      <LeftMenu style={{height:'100%'}}/>
      <div className={styles.cardDiv + " " + "noselect"}>
        <img src={userImage} alt="" className={styles.profilePhoto}/>
          <div className={styles.darkGradient}>
            <div className={styles.profileInfo}>
              <span className={styles.name}>{currentProfile.user_name}</span>
              <p className={styles.desc}>{currentProfile.about}</p>
            </div>
          <div className={styles.buttonsDiv}>
            <div onClick={skipProfile} className={styles.cancelBtn + " " + styles.buttonCard }>
              <img src={require("../../images/cross.svg").default} alt="" />
            </div>
            <div onClick={addToFavorite} className={styles.favoriteBtn + " " + styles.buttonCard}>
              <img src={require("../../images/favorite.svg").default} alt="" />
            </div>
            <div onClick={writeMessage} className={styles.messageBtn + " " + styles.buttonCard}>
              <img src={require("../../images/message.svg").default} alt="" />
            </div>
            <div onClick={likeProfile} className={styles.likeBtn + " " + styles.buttonCard}>
              <img src={require("../../images/like.svg").default} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
