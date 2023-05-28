import React, { Component, useContext } from "react";
import styles from "./SympElem.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SympCont from "../../../context";

export default function SympElem({ id_sympathy, file_path, user_name }) {
  const navigate = useNavigate();
  const { updateSymp, setUpdateSymp } = useContext(SympCont);
  function delSymp() {
    console.log(id_sympathy);
    console.log(updateSymp);
    axios
      .put(`http://localhost:3050/sympReceived/${id_sympathy}`)
      .then((resp) => {
        if (updateSymp == true) {
          setUpdateSymp(false);
        } else {
          setUpdateSymp(true);
        }
      });
  }
  function goChat() {
    navigate("/messages");
  }
  return (
    <div className={styles.symp_elem}>
      <div className={styles.symp_elem_content}>
        <div className={styles.div_img}>
          <img
            className={styles.img}
            src={require("../../../images/gosling.svg").default}
            // src={require(file_path).default}
            alt=""
          />
        </div>
        <div className={styles.div_text}>
          <h1 className={styles.text}>
            Новая симпатия! {user_name} заинтересовался Вами!
          </h1>
        </div>
      </div>
      <div className={styles.div_event}>
        <div className={styles.div_cross}>
          <img
            onClick={delSymp}
            className={styles.cross}
            src={require("../../../images/cross_white.svg").default}
            alt=""
          />
        </div>
        <div className={styles.div_mes}>
          <img
            onClick={goChat}
            className={styles.mes}
            src={require("../../../images/message_white.svg").default}
            alt=""
          />
          {/* <h1 className={styles.mes}>Ответить</h1> */}
        </div>
      </div>
    </div>
  );
}
