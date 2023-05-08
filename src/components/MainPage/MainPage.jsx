import React from "react";
import styles from "./MainPage1.module.css";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className={styles.mainPage}>
      <div className={styles.main}>
        <div className={styles.aut_reg}>
          <div className={styles.center_div}>
            <div className={styles.center_content}>
              <div className={styles.logo_div}>
                <img
                  src={require("../../images/logo.jpg")}
                  alt=""
                  className={styles.logo}
                />
              </div>
              <div className={styles.tagline_reg_div}>
                <div className={styles.tagline_div}>
                  <span className={styles.tagline_span}>ЛЕГКО.</span>
                  <span className={styles.tagline_span}>УДОБНО.</span>
                  <span className={styles.tagline_span}>НАВСЕГДА</span>
                </div>
                <div className={styles.reg_div}>
                  <Link to={"/registration"}>
                  <button  className={styles.reg_button}>
                    Начать знакомиться
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.aut_div}>
          <Link to={"/authorization"}>
            <button className={styles.aut_button}>Войти</button>
          </Link>
          </div>
        </div>
        <div className={styles.disc}>
          <div className={styles.disc_content}>
            <div className={styles.disc_span_div}>
              <p className={styles.disc_p}>
                <span className={styles.disc_span}>ЗНАКОМИТЬСЯ</span> ЕЩЕ
                НИКОГДА НЕ БЫЛО{" "} <span className={styles.disc_span}>ТАК
                ПРОСТО</span>
              </p>
              <span className={styles.disc_span}></span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footer_content}>
          <div className={styles.text_div}>
            <span className={styles.text_span}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut
              suscipit tortor. Integer finibus libero sed purus accumsan
              aliquet. Sed tincidunt pharetra finibus. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Morbi est lectus, viverra at varius id, rhoncus quis quam.
              Maecenas eleifend, dui sit.
            </span>
          </div>
          <div className={styles.rights_div}>
            <span className={styles.rights_span}>
              © 2023 FiftyFourDate, LLC. Все права защищены
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
