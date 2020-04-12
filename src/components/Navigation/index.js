import React, { useContext } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { GlobalDispatchProvider } from "context/GlobalContextProvider";
import Logo from "./Logo";
import External from "./External";
import TopBar from "./TopBar";
import SubMenu from "./SubMenu";
import ToggleButton from "./ToggleButton";
import TransitionLink from "gatsby-plugin-transition-link";

import styles from "./Navigation.module.scss";

const TRANSITION_LENGTH = 0.4;

function Navigation({ location, isCollapsed }) {
  const dispatch = useContext(GlobalDispatchProvider);

  const exitTransition = {
    length: TRANSITION_LENGTH,
  };
  const entryTransition = {
    delay: TRANSITION_LENGTH,
  };

  const onToggle = () => {
    return dispatch({
      type: "TOGGLE_NAVIGATION",
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
        <Logo />
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
              "/portfolio/invitaion-packages": {
                label: "Комплекты пригласительных",
              },
            }}
            path={location.pathname}
          />
          <TransitionLink
            exit={exitTransition}
            entry={entryTransition}
            to="/about"
            activeClassName={styles["navigation__menu-item--active"]}
          >
            О проекте
          </TransitionLink>
          <TransitionLink
            to="/posts"
            exit={exitTransition}
            entry={entryTransition}
            activeClassName={styles["navigation__menu-item--active"]}
          >
            Блог
          </TransitionLink>
          <TransitionLink
            to="/contacts"
            exit={exitTransition}
            entry={entryTransition}
            activeClassName={styles["navigation__menu-item--active"]}
          >
            Контакты
          </TransitionLink>
        </nav>
        <External />
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
