import React from "react";
import styles from './ProfilePage.module.css'
import LeftMenu from "../LeftMenu/LeftMenu";

export default function ProfilePage(){
    return(
        <div>
            <LeftMenu/>
            <header className={styles.header}>
                <img src={require('../../images/profile_photo.jpg')} alt="" className={styles.profileAvatar}/>
                <p className={styles.profileName}>Алина Сухачева</p>
                <button className={styles.addPhoto}>Добавить фото</button>
                <div classname={styles.editDiv}>
                    <img src={require('../../images/pencil.svg').default} alt="" />
                    <span className={styles.edit}>Редактировать</span>
                </div>
                
            </header>
            <hr />
            <div className={styles.contentDiv}>
                <img src={require('../../images/photo.jpg')} alt="" className={styles.profilePhoto} />
                <img src={require('../../images/photo1.jpg')} alt="" className={styles.profilePhoto} />
                <img src={require('../../images/photo.jpg')} alt="" className={styles.profilePhoto} />
                <img src={require('../../images/photo1.jpg')} alt="" className={styles.profilePhoto} />
                <img src={require('../../images/photo.jpg')} alt="" className={styles.profilePhoto} />
                <img src={require('../../images/photo1.jpg')} alt="" className={styles.profilePhoto} />
            </div>

        </div>
    )
}