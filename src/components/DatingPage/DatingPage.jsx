import React from 'react'
import LeftMenu from '../LeftMenu/LeftMenu'
import styles from './DatingPage.module.css'

export default function DatingPage() {
  function skipProfile(){
    console.log("skip");
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

  return (
    <div className={styles.datingPage}>
      <LeftMenu style={{height:'100%'}}/>
      <div className={styles.cardDiv + " " + "noselect"}>
        <img src={require("../../images/den.jpg")} alt="" className={styles.profilePhoto}/>
          <div className={styles.darkGradient}>
            <div className={styles.profileInfo}>
              <span className={styles.name}>Денис, 30</span>
              <p className={styles.desc}>поедим питсы вместе?</p>
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
