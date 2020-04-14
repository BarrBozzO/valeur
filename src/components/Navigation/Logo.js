import React from "react";

import Link from "components/Link";

import styles from "./Navigation.module.scss";

const TRANSITION_LENGTH = 1;

function Logo() {
  return (
    <div className={styles["navigation__logo"]}>
      <Link to="/" />
    </div>
  );
}

export default Logo;
