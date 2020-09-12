import React, { useEffect, useState } from "react";
import throttle from "lodash/throttle";
import cx from "classnames";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import ToggleButton from "./ToggleButton";
import Logo from "assets/logo/valeur.svg";

import styles from "./Navigation.module.scss";

const getCoords = elem => {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
};

const scrollListener = cb =>
  throttle(() => {
    const element = document.getElementById("polygraphy");
    if (element) {
      const coords = getCoords(element);
      cb(coords.top < window.scrollY + 60 - element.clientHeight);
    }
  }, 300);

const isHomePage = location => Boolean(location) && location.pathname === "/";

function TopBar({ onClick, isCollapsed, location, onClose }) {
  const [displayLogo, setDisplayLogo] = useState(!isHomePage(location));

  useEffect(() => {
    if (isHomePage(location)) {
      document.addEventListener("scroll", scrollListener(setDisplayLogo));

      return () => {
        document.removeEventListener("scroll", scrollListener);
      };
    }
  }, [location]);

  return (
    <div className={styles["topbar"]}>
      <div
        className={cx(styles["topbar__logo"], {
          [styles["topbar__logo--display"]]: Boolean(displayLogo),
        })}
      >
        <Link onClick={onClose} className={styles["topbar__logo-link"]} to="/">
          <Logo className={styles["topbar__logo-image"]} />
        </Link>
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
  isCollapsed: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TopBar;
