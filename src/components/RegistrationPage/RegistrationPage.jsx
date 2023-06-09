import React, { useEffect, useState } from 'react'
import styles from './RegistrationPage.module.css'
import { Box } from '@mui/material'
import {TextField, Button, Typography, Select, MenuItem, InputLabel} from '@mui/material'
import sha256 from 'sha256'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function RegistrationPage() {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [about, setAbout] = useState("");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [image, setImage] = useState("");

  const [cities, setCities] = useState([]);

  const [isDateInvalid, setIsDateInvaild] = useState(false);
  const [isLoginInvalid, setIsLoginInvaild] = useState(false);

  const navigate = useNavigate()

  async function isAlreadyRegistred(){

    return axios.get(`http://localhost:3050/getUserByPhone/${login}`)
    .then((resp)=>{
      // console.log(resp);
      // console.log(resp.data.length);
      // console.log(resp.data.length > 0 && resp.status === 200);
      return resp.data.length > 0 && resp.status === 200 ? true : false 
    })

  }

  async function registrate(){
   if (await isAlreadyRegistred()){
    alert("Пользователь с таким номером уже зарегистрирован")
    return
   }else{
      let fullAge = (((new Date() - new Date(birthDate))  - (Math.floor((new Date().getUTCFullYear() - new Date(birthDate).getUTCFullYear()) / 4) * 24 *60* 60 * 1000) ) / (60000 *  60 * 24 * 365 ));

      if(fullAge >= 18 && !isLoginInvalid){
        
        const form = new FormData();
        form.append('login', login);   
        form.append('password', sha256(password));   
        form.append('name', name);   
        form.append('gender', gender);   
        form.append('city', city);   
        form.append('birthDate', birthDate);   
        form.append('about', about);   
        form.append('height', height);   
        form.append('weight', weight);   
        form.append('image', image);   


        axios.post('http://localhost:3050/registrate',
        // JSON.stringify({
        //       login,
        //       password:sha256(password),
        //       name,
        //       gender,
        //       city,
        //       birthDate,
        //       about,
        //       height,
        //       weight
        //     }),
          form,
            {
              headers:{
                'Content-Type': "multipart/form-data"
              }
            }
        ).then((resp)=>{
          // console.log(resp);
          if(resp.status === 200){
            alert("Вы успешно зарегистрировались!")
            navigate("/authorization")
          }
        })
      }else{
        alert('Проверьте правильность заполнения полей')
      }
   }
  }

  function checkDate(){
    let fullAge = (((new Date() - new Date(birthDate))  - (Math.floor((new Date().getUTCFullYear() - new Date(birthDate).getUTCFullYear()) / 4) * 24 *60* 60 * 1000) ) / (60000 *  60 * 24 * 365 ));
    return  fullAge >= 18 ? setIsDateInvaild(false) : setIsDateInvaild(true)
  }

  function checkLogin(){
    return login.match(/79\d\d\d\d\d\d\d\d\d/) != null && login.length === 11 ? setIsLoginInvaild(false) : setIsLoginInvaild(true)
  } 

  useEffect(()=>{
    let localLogin = localStorage.getItem('login')
    let localPassword = localStorage.getItem('password')

    axios.get(`http://localhost:3050/getUserByPhone/${localLogin}`)
    .then((resp)=>{
      console.log(resp);
      if(resp.status === 200 && localLogin == resp.data[0].phone_number && resp.data[0].password == localPassword){
        navigate('/dating')
      }
    })

  },[])
  
  useEffect(()=>{
    axios.get('http://localhost:3050/getCities')
    .then((resp)=>{
      setCities(resp.data.result)
    })
  },[])

  // useEffect(()=>{                                    ДОБАВЛЕНИЕ НОВОЙ ФОТОГРАФИИ ДЛЯ ПРОФИЛЯ !!!!!!!!!!!!!!!!
  //   console.log(image);
    // axios.post(`http://localhost:3050/sendPhoto`, {image: image}, {
    //   headers: {
    //     'Content-Type': "multipart/form-data"
    //   }
    // })
    // .then((resp)=>{
    // })
  // },[image])


  return (
    <div className={styles.registrationPage}>
      <img src={require("../../images/logo.svg").default} alt="" className={"logoLink"} onClick={()=>{navigate("/")}}/>
      <form className={styles.form} onSubmit={(e)=>{
        e.preventDefault()
        registrate();
        }}>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          maxWidth={757}
          margin='auto'
          padding={5}
          borderRadius={5}
          boxShadow={'5px 5px 10px #ccc'}
        >
        <h2>Регистрация</h2>
        <TextField required onChange={(e)=>{
          setLogin(e.target.value)
          }} onBlur={checkLogin} error={isLoginInvalid} type='phone' fullWidth={true} margin='normal' label="Номер телефона" variant="outlined" placeholder='Введите номер телефона...'/>
        <TextField required onChange={(e)=>{setPassword(e.target.value)}} fullWidth={true} type='password' margin='normal' label="Пароль" variant="outlined" placeholder='Придумайте пароль...'/>
        <TextField required onChange={(e)=>{setName(e.target.value)}} fullWidth={true} margin='normal' label="Как вас зовут?" variant="outlined"/>
        <InputLabel>Пол</InputLabel>
        <Select 
        native
        required
        fullWidth={true}
          onChange={(event)=>{setGender(event.target.value)}}>
          <option value="" >Выберите пол</option>
          <option value={"Мужской"}>Мужской</option>
          <option value={"Женский"}>Женский</option>
        </Select>

        <InputLabel>Город</InputLabel>
        <Select 
        native
        required
        fullWidth={true}
          defaultValue={0} // доделать валидацию с селектами и авторизацию
          onChange={(event)=>{setCity(event.target.value)}}>
          <option value="" >Выберите город</option>
            
            {
              cities.map((city,index)=>(
                <option value={city.id_city}>{city.city_name}</option>
              ))
            }
          
        </Select>
        <TextField required onChange={(e)=>{
          setBirthDate(e.target.value)
          }} onBlur={checkDate} type='date' fullWidth={true} error ={isDateInvalid} margin='normal' variant="outlined" defaultValue="Дата рождения" helperText="Сервис доступен лицам старше 18 лет"/>
        <TextField onChange={(e)=>{setAbout(e.target.value)}} fullWidth={true} margin='normal' label="Кратко о себе" variant="outlined"/>
        <TextField required type='number' InputProps={{ inputProps: { min: 135, max: 230 } }} onChange={(e)=>{setHeight(e.target.value)}} fullWidth={true} margin='normal' label="Ваш рост" variant="outlined"/>
        <TextField required type='number' InputProps={{ inputProps: { min: 35, max: 250 } }} onChange={(e)=>{setWeight(e.target.value)}} fullWidth={true} margin='normal' label="Ваш вес" variant="outlined"/>
        <InputLabel>Загрузите Ваше фото</InputLabel>
        <TextField required type='file' InputProps={{ inputProps: { accept:".jpg,.jpeg,.png" } }}   onChange={(e)=>{setImage(e.target.files[0])}} fullWidth={true} margin='normal' variant="outlined"/>
        <Button type='submit' sx={{fontFamily:'InterSemiBold',textTransform: 'none', fontSize:'22px', fontStyle:'normal', backgroundColor:'black', padding:'5px 204px 5px 204px', marginTop:'10px', maxWidth:'485px'}} margin='normal' variant="contained">Зарегистрироваться</Button>
        <Typography variant="body1" sx={{fontFamily: 'InterSemiBold',textTransform: 'none', marginTop:'15px' }}> Уже есть аккаунт? <Link to={'/authorization'} className={styles.linkAuth}>Авторизация</Link></Typography>
        </Box>
      </form>
    </div>
  )
}
