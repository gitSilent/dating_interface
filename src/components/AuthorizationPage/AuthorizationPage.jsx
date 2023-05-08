import React, { useEffect, useState } from 'react'
import styles from './AuthorizationPage.module.css'
import { Box } from '@mui/material'
import {TextField, Button, Typography} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import sha256 from 'sha256'
import {Navigate} from 'react-router-dom'
import axios from 'axios'

export default function AuthorizationPage() {
  const[login, setLogin] = useState();
  const[password, setPassword] = useState();

  const navigate = useNavigate();

  async function authorizate(){
    console.log(login + " " + password);

    axios.get(`http://localhost:3050/getUserByPhone/${login}`)
    .then((resp)=>{
      console.log(resp);
      if(resp.status === 200 && login == resp.data[0].phone_number && resp.data[0].password == sha256(password)){
        localStorage.setItem("login", login)
        localStorage.setItem("password", sha256(password))
        navigate("/dating")
      }else if(resp.status === 200 && login == resp.data[0].phone_number && resp.data[0].password != sha256(password)){
        alert("Неверный пароль!")
      }
      else if(resp.status === 204){
          alert("Проверьте правильность заполнения полей!")
        }
    })

    // try{
    //   let response = await fetch(`http://localhost:3050/getUserByPhone/${login} `)
    //   let data = await response.json()
    //   console.log(data)
    //   if(login == data[0].phone_number && data[0].password == sha256(password)){
    //     // console.log('authorized'); 
    //     localStorage.setItem("login", login)
    //     localStorage.setItem("password", sha256(password))
    //     navigate("/dating")
    //   }else{
    //     alert("Проверьте правильность заполнения полей!")
    //   }
    // }catch(er){
    //   alert("Проверьте правильность заполнения полей!")
    //   console.log(er);
    // }
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

  return (
    <div className={styles.authorizationPage}>
    <img src={require("../../images/logo.svg").default} alt="" className={"logoLink"} onClick={()=>{navigate("/")}} />
      <form className={styles.form} onSubmit={(e)=>{
        e.preventDefault()
        authorizate();
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
        <h2>Авторизация</h2>
        <TextField onChange={(e)=>{setLogin(e.target.value)}} fullWidth={true} margin='normal' label="Номер телефона" variant="outlined" placeholder='Введите номер телефона'/>
        <TextField onChange={(e)=>{setPassword(e.target.value)}} fullWidth={true} margin='normal' label="Пароль" variant="outlined" placeholder='Введите пароль'/>
        <Button type='submit' sx={{fontFamily:'InterSemiBold',textTransform: 'none', fontSize:'22px', fontStyle:'normal', backgroundColor:'black', padding:'5px 204px 5px 204px', marginTop:'10px', maxWidth:'485px'}} margin='normal' variant="contained">Войти</Button>
        <Typography variant="body1" sx={{fontFamily: 'InterSemiBold', marginTop:'15px' }}> Нет аккаунта? <Link to={'/registration'} className={styles.linkReg}> Регистрация</Link></Typography>
        </Box>
      </form>
    </div>
  )
}
