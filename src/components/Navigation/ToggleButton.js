import React from "react";
import cx from "classnames";

import styles from "./Navigation.module.scss";

function ToggleButton({ className, isCollapsed, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cx(styles["toggle-button"], className, {
        [styles["toggle-button--opened"]]: !isCollapsed,
      })}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default ToggleButton;
