import React from 'react'
import styles from './ErrorPage.module.css'

export default function ErrorPage() {
  return (
    <div>
        <div className={styles.errorDiv}>
            <h1>Непредвиденная ошибка</h1>
            <h2>404 - Страница не найдена</h2>
        </div>
        <img src={require('../../images/404_error.jpg')} alt="" className={styles.imgError}/>
    </div>
  )
}
