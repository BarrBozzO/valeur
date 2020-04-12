import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";

import styles from "./Navigation.module.scss";

const TRANSITION_LENGTH = 1;

function Logo() {
  return (
    <div className={styles["navigation__logo"]}>
      <TransitionLink
        to="/"
        entry={{ delay: TRANSITION_LENGTH }}
        exit={{ length: TRANSITION_LENGTH }}
      />
    </div>
  );
}

export default Logo;
