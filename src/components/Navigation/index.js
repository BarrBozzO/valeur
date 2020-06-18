import React, { useContext } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { GlobalDispatchProvider } from "context/GlobalContextProvider";
import TopBar from "./TopBar";
import SubMenu from "./SubMenu";
import ToggleButton from "./ToggleButton";
import Link from "components/Link";
import Logo from "assets/logo/logo.svg";

import styles from "./Navigation.module.scss";

function Navigation({ location, isCollapsed }) {
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
      <TopBar onClick={onToggle} isCollapsed={isCollapsed} />
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
            <Logo className={styles["navigation__logo-image"]} />
          </Link>
        </div>
        <nav className={styles["navigation__menu"]}>
          <SubMenu
            title="Портфолио"
            classNames={{
              "active-item": styles["navigation__menu-item--active"],
            }}
            items={{
              "/portfolio/online-invitations": {
                label: "Электронные пригласительные",
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
