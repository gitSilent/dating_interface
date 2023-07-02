import React, { useEffect, useState } from 'react'
import styles from './LeftMenu.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function LeftMenu() {

  const [isVisible, setIsVisible] = useState(false);

  const [userInfo, setUserInfo] = useState({})

  const navigate = useNavigate();

  

  useEffect(()=>{
    let localLogin = localStorage.getItem('login')

    axios.get(`http://localhost:3050/getUserByPhone/${localLogin}`)
    .then((resp)=>{
      setUserInfo(resp.data[0])

    })
  },[])
  if(isVisible){
    return (
      <div className={styles.leftMenu}>
        <img onClick={(e)=>{setIsVisible(false)}} src={require("../../images/menu_sandwich.svg").default} alt="" className={styles.menuSandwich_img} />
        
        <div className={styles.userProfile}>
          <img src={require("../../images/profile_photo.jpg")} alt="" className={styles.profilePhoto} />
          <span className={styles.userName}>{userInfo.user_name}</span>
          {/* <span>Сухачева</span> */}
        </div>
        <div className={styles.selectList_div}> 
            <ul>
              <li>
                <Link to={'/'} className={styles.liLink}>Главная</Link>
              </li>
              <li>
                <Link to={'/profile'} className={styles.liLink}>Профиль</Link>
              </li>
              <li>
                <Link to={'/sympathies'} className={styles.liLink}>Симпатии</Link>
              </li>
              <li>
                <Link to={'/messages'} className={styles.liLink}>Сообщения</Link>
              </li>
              <li>
                <Link to={'/'} onClick={()=>{
                  
                  localStorage.removeItem('id')
                  localStorage.removeItem('login')
                  localStorage.removeItem('password')

                }} className={styles.liLink}>Выйти</Link>
              </li>
            </ul>
        </div>
      </div>
    )
  }else{
    return(
      <img onClick={(e)=>{setIsVisible(true) }} src={require("../../images/menu_sandwich_black.svg").default} alt="" className={styles.menuSandwich_img} />

    )
  }
}
