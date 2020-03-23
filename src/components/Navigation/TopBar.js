import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import styles from "./Navigation.module.scss";

function TopBar({ onClick, isCollapsed }) {
  return (
    <div className={styles["topbar"]}>
      <div className={cx(styles["topbar__logo"])}>
        <Link to="/">logo</Link>
      </div>
      <div
        className={cx(styles["topbar__toggle-nav"], {
          [styles["topbar__toggle-nav--close"]]: !isCollapsed,
        })}
        onClick={onClick}
      >
        MENU
      </div>
    </div>
  );
}

TopBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default TopBar;
