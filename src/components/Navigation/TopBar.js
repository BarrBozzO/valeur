import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import ToggleButton from "./ToggleButton";

import styles from "./Navigation.module.scss";

function TopBar({ onClick, isCollapsed }) {
  return (
    <div className={styles["topbar"]}>
      <div className={cx(styles["topbar__logo"])}>
        <Link to="/">logo</Link>
      </div>
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
