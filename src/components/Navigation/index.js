import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { GlobalDispatchProvider } from "context/GlobalContextProvider";
import TopBar from "./TopBar";
import SubMenu from "./SubMenu";
import ToggleButton from "./ToggleButton";
import Link from "components/Link";
import Polygraphy from "assets/logo/polygraphy.svg";
import Valeur from "assets/logo/valeur.svg";

import styles from "./Navigation.module.scss";

function Navigation({ location, isCollapsed, title, mount }) {
  const dispatch = useContext(GlobalDispatchProvider);

  const onToggle = () => {
    return dispatch({
      type: "TOGGLE_NAVIGATION",
    });
  };

  const onClose = () => {
    return dispatch({
      type: "COLLAPSE_NAVIGATION",
    });
  };

  return (
    <>
      <TopBar
        title={title}
        mount={mount}
        onClick={onToggle}
        isCollapsed={isCollapsed}
      />
      <div
        className={cx(styles["navigation"], {
          [styles["navigation--collapsed"]]: isCollapsed,
        })}
      >
        <ToggleButton
          className={styles["navigation__toggle-button"]}
          isCollapsed={isCollapsed}
          onClick={onToggle}
        />
        <div className={cx(styles["navigation__logo"])}>
          <Link
            className={styles["navigation__logo-link"]}
            to="/"
            onClick={onClose}
          >
            <Valeur className={styles["navigation__logo-image--valeur"]} />
            <Polygraphy
              className={styles["navigation__logo-image--polygraphy"]}
            />
          </Link>
        </div>
        <nav className={styles["navigation__menu"]}>
          <SubMenu
            title="Портфолио"
            classNames={{
              "active-item": styles["navigation__menu-item--active"],
            }}
            items={{
              "/portfolio/savethedate-kits": {
                label: "Save The Date",
              },
              "/portfolio/invitation-kits": {
                label: "Комплекты пригласительных",
              },
            }}
            path={location.pathname}
            onClose={onClose}
          />
          <Link
            to="/posts"
            className={styles["navigation__menu-item"]}
            activeClassName={styles["navigation__menu-item--active"]}
            onClick={onClose}
          >
            Блог
          </Link>
          <Link
            to="/contacts"
            className={styles["navigation__menu-item"]}
            activeClassName={styles["navigation__menu-item--active"]}
            onClick={onClose}
          >
            Контакты
          </Link>
        </nav>
      </div>
    </>
  );
}

SubMenu.propTypes = {
  location: PropTypes.object.isRequired,
};

SubMenu.defaultProps = {
  location: {},
};

export default Navigation;
