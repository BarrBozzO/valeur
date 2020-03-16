import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Link } from "gatsby";
import Logo from "./Logo";
import External from "./External";
import TopBar from "./TopBar";
import SubMenu from "./SubMenu";

import styles from "./Navigation.module.scss";

function Navigation({ location }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <TopBar
        onClick={() => setIsCollapsed(!isCollapsed)}
        isCollapsed={isCollapsed}
      />
      <div
        className={cx(styles["navigation"], {
          [styles["navigation--collapsed"]]: isCollapsed,
        })}
      >
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
          <Link
            to="/about"
            activeClassName={styles["navigation__menu-item--active"]}
          >
            О проекте
          </Link>
          <Link
            to="/posts"
            activeClassName={styles["navigation__menu-item--active"]}
          >
            Блог
          </Link>
          <Link
            to="/contacts"
            activeClassName={styles["navigation__menu-item--active"]}
          >
            Контакты
          </Link>
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
