import React, { Component, useEffect, useState, useContext } from "react";
import styles from "./SympathiesPage.module.css";
import LeftMenu from "../LeftMenu/LeftMenu";
import SympElem from "./SympElem/SympElem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SympCont from "../../context";

export default function SympathiesPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [sympMas, setsympMas] = useState([]);
  const [updateSymp, setUpdateSymp] = useState(true);
  const [flag, setFlag] = useState(true);

  let localLogin = localStorage.getItem("login");
  console.log(localLogin);
  useEffect(() => {
    //useEffect, который проверяет, авторизован ли пользователь,  перешедший на страницу /dating, используя данные их localStorage
    let localLogin = localStorage.getItem("login");
    let localPassword = localStorage.getItem("password");

    axios
      .get(`http://localhost:3050/getUserByPhone/${localLogin}`)
      .then((resp) => {
        console.log(resp.data);
        if (resp.status === 204 || resp.data[0].password != localPassword) {
          navigate("/authorization");
        }
        setUserInfo(resp.data[0]);
      });
  }, []);

  console.log(userInfo);
  console.log(userInfo.id_user);
  useEffect(() => {
    axios
      .get(`http://localhost:3050/getSympathies/${userInfo.id_user}`)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data != "") {
          setsympMas(resp.data);
          setFlag(true);
        } else {
          setsympMas([]);
          console.log("Раскрыта");
          setFlag(false);
          console.log(flag);
        }
        console.log(flag);
      });
  }, [userInfo, updateSymp]);
  console.log(flag);

  // useEffect(() => {
  //   if (sympMas.length == 0) {
  //     flag = false;
  //   } else {
  //     flag = true;
  //   }
  //   console.log(sympMas.length);
  //   console.log(flag);
  // }, [sympMas]);

  function Empty() {
    console.log(sympMas.length);
    console.log(flag);
    if (flag == false) {
      // if (sympMas.length == 0) {
      return (
        <div className={styles.empty_div}>
          <h1 className={styles.empty_text}>Список симпатий пуст.</h1>
        </div>
      );
      // }
    }
  }

  return (
    <SympCont.Provider value={{ updateSymp, setUpdateSymp }}>
      <div className={styles.symp_page}>
        <LeftMenu />
        <div className={styles.symp_div}>
          <div className={styles.header}>
            <h1 className={styles.header_text}>Симпатии</h1>
          </div>
          <div className={styles.symp_main}>
            <nav className={styles.symp_nav}>
              <ul className={styles.symp_ul}>
                {sympMas.map(({ id_sympathy, file_path, user_name }) => (
                  <li className={styles.symp_li} key={id_sympathy}>
                    <SympElem
                      id_sympathy={id_sympathy}
                      file_path={file_path}
                      user_name={user_name}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <Empty></Empty>
        </div>
      </div>
    </SympCont.Provider>
  );
}
