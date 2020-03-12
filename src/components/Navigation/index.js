import React, { useState } from "react";
import cx from "classnames";
import { Link } from "gatsby";
import Logo from "./Logo";
import External from "./External";
import TopBar from "./TopBar";

import styles from "./Navigation.module.scss";

function Navigation() {
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

export default Navigation;
