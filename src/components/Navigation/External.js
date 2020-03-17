import React from "react";
import InstagramIcon from "assets/icons/instagram.svg";
import FacebookIcon from "assets/icons/facebook.svg";
import BehanceIcon from "assets/icons/behance.svg";

import styles from "./Navigation.module.scss";

function External() {
  return (
    <div className={styles["navigation__external"]}>
      <div className={styles["navigation__external-socials"]}>
        <div className={styles["navigation__external-socials-link"]}>
          <a href="https://www.instagram.com/v_aleur/" target="_blank">
            <InstagramIcon
              className={styles["navigation__external-socials-icon"]}
            />
          </a>
        </div>
        <div className={styles["navigation__external-socials-link"]}>
          <a href="https://www.instagram.com/v_aleur/" target="_blank">
            <FacebookIcon
              className={styles["navigation__external-socials-icon"]}
            />
          </a>
        </div>
        <div className={styles["navigation__external-socials-link"]}>
          <a href="https://www.instagram.com/v_aleur/" target="_blank">
            <BehanceIcon
              className={styles["navigation__external-socials-icon"]}
            />
          </a>
        </div>
      </div>
      <div className={styles["navigation__external-dev-by"]}>
        Developed by{" "}
        <a href="https://github.com/BarrBozzO/velour" target="_blank">
          BarrBozzO
        </a>
      </div>
    </div>
  );
}

export default External;
