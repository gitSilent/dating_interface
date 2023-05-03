import React from 'react'
import LeftMenu from '../LeftMenu/LeftMenu'
import styles from './DatingPage.module.css'

export default function DatingPage() {
  return (
    <div className={styles.datingPage}>
      <LeftMenu />
      <div className={styles.cardDiv}>
        <img src={require("../../images/den.jpg")} alt="" className={styles.profilePhoto}/>
        <div className={styles.profileInfo}>
          <span className={styles.name}>Денис, 30</span>
          <p className={styles.desc}>поедим питсы вместе?</p>
        </div>
        <div className={styles.buttonsDiv}>
          <div className={styles.cancelBtn + " " + styles.buttonCard}>
            <img src={require("../../images/cross.svg").default} alt="" />
          </div>
          <div className={styles.favoriteBtn + " " + styles.buttonCard}>
            <img src={require("../../images/favorite.svg").default} alt="" />
          </div>
          <div className={styles.messageBtn + " " + styles.buttonCard}>
            <img src={require("../../images/message.svg").default} alt="" />
          </div>
          <div className={styles.likeBtn + " " + styles.buttonCard}>
            <img src={require("../../images/like.svg").default} alt="" />
          </div>
        </div>
        <div className={styles.darkGradient}></div>
      </div>
    </div>
  );
}
