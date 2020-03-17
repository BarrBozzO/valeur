import React from "react";
import { Link } from "gatsby";

import styles from "./Navigation.module.scss";

function Logo() {
  return (
    <div className={styles["navigation__logo"]}>
      <Link to="/" />
    </div>
  );
}

export default Logo;
