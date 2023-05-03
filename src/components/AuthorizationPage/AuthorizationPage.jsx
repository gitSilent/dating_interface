import React from 'react'
import styles from './AuthorizationPage.module.css'
import { Box } from '@mui/material'
import {TextField, Button, Typography} from '@mui/material'

export default function AuthorizationPage() {
  return (
    <div className={styles.authorizationPage}>
      
      <div className='form'>
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
        <TextField fullWidth={true} margin='normal' label="Номер телефона" variant="outlined" placeholder='Введите номер телефона'/>
        <TextField fullWidth={true} margin='normal' label="Пароль" variant="outlined" placeholder='Введите пароль'/>
        <Button sx={{fontFamily:'Popins', fontSize:'22px', fontStyle:'normal', backgroundColor:'black', padding:'5px 204px 5px 204px', marginTop:'10px', maxWidth:'485px'}} margin='normal' variant="contained">Войти</Button>
        <Typography variant="body1" sx={{fontFamily: 'Popins', marginTop:'15px' }}> Нет аккаунта? <span className="linkReg"> Регистрация</span></Typography>
        </Box>
      </div>
    </div>
  )
}
