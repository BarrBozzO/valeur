import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { CSSTransition } from "react-transition-group";
import ToggleButton from "./ToggleButton";
import Logo from "assets/logo/valeur.svg";

import styles from "./Navigation.module.scss";

const ANIMATION_DURATION = 2000;

function TopBar({ onClick, isCollapsed, title, mount }) {
  console.log(mount, title);
  return (
    <div className={styles["topbar"]}>
      <div className={cx(styles["topbar__logo"])}>
        <Link className={styles["topbar__logo-link"]} to="/">
          <Logo className={styles["topbar__logo-image"]} />
        </Link>
      </div>
      <CSSTransition
        in={mount}
        timeout={ANIMATION_DURATION}
        unmountOnExit
        appear
        classNames={{
          appear: styles["topbar__transition--appear"],
          appearActive: styles["topbar__transition--appear-active"],
          appearDone: styles["topbar__transition--appear-done"],
          enter: styles["topbar__transition--enter"],
          enterActive: styles["topbar__transition--enter-active"],
          enterDone: styles["topbar__transition--enter-done"],
          exit: styles["topbar__transition--exit"],
          exitActive: styles["topbar__transition--exit-active"],
          exitDone: styles["topbar__transition--exit-done"],
        }}
      >
        <div>
          <h1 className={styles["topbar__title"]}>{title}</h1>
        </div>
      </CSSTransition>
      <ToggleButton
        className={styles["topbar__toggle-button"]}
        isCollapsed={isCollapsed}
        onClick={onClick}
      />
    </div>
  );
}

TopBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default TopBar;
