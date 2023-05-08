import React, { useEffect, useState } from 'react'
import styles from './RegistrationPage.module.css'
import { Box } from '@mui/material'
import {TextField, Button, Typography, Select, MenuItem, InputLabel} from '@mui/material'
import sha256 from 'sha256'
import { Link, useNavigate } from 'react-router-dom'

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

  const [cities, setCities] = useState([]);

  const [isDateInvalid, setIsDateInvaild] = useState(false);
  const [isLoginInvalid, setIsLoginInvaild] = useState(false);

  const navigate = useNavigate()

  async function isAlreadyRegistred(){
    try{
      let response = await fetch(`http://localhost:3050/getUserByPhone/${login}`)
      let data = await response.json()
      console.log(data)
      return data.length > 0 ? true : false 
    }catch(er){
      console.log(er);
      return false
    }

  }

  async function registrate(){
   if (await isAlreadyRegistred()){
    console.log('already registred')
    alert("Пользователь с таким номером уже зарегистрирован")
    return
   }else{
      let fullAge = (((new Date() - new Date(birthDate))  - (Math.floor((new Date().getUTCFullYear() - new Date(birthDate).getUTCFullYear()) / 4) * 24 *60* 60 * 1000) ) / (60000 *  60 * 24 * 365 ));
      console.log(sha256(password));

      if(fullAge >= 18){
        let response = await fetch('http://localhost:3050/registrate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            login,
            password:sha256(password),
            name,
            gender,
            city,
            birthDate,
            about,
            height,
            weight
          })
        });
        alert("Вы успешно зарегистрировались!")
        navigate("/authorization")

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
    console.log(login);
    console.log(login.match(/(?:\+|\d)[\d\-\(\) ]{9,}\d/g));
    return login.match(/79\d\d\d\d\d\d\d\d\d/) != null && login.length === 11 ? setIsLoginInvaild(false) : setIsLoginInvaild(true)
  } 

  useEffect(()=>{
    fetch('http://localhost:3050/getCities')
    .then(response => response.json())
    .then((data)=>{
      // console.log(data.result);
      setCities(data.result)
    })
  },[])


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
        <InputLabel>Гендер</InputLabel>
        <Select 
        native
        required
        fullWidth={true}
          onChange={(event)=>{setGender(event.target.value)}}>
          <option value="" >Выберите гендер</option>
          <option value={"Мужской"}>Мужской</option>
          <option value={"Женский"}>Женский</option>
          <option value={"Би"}>Би</option>
          <option value={"MtF"}>MtF</option>
          <option value={"FtM"}>FtM</option>
          <option value={"Другой"}>Другой</option>
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
        <Button type='submit' sx={{fontFamily:'InterSemiBold',textTransform: 'none', fontSize:'22px', fontStyle:'normal', backgroundColor:'black', padding:'5px 204px 5px 204px', marginTop:'10px', maxWidth:'485px'}} margin='normal' variant="contained">Зарегистрироваться</Button>
        <Typography variant="body1" sx={{fontFamily: 'InterSemiBold',textTransform: 'none', marginTop:'15px' }}> Уже есть аккаунт? <Link to={'/authorization'} className={styles.linkAuth}>Авторизация</Link></Typography>
        </Box>
      </form>
    </div>
  )
}
