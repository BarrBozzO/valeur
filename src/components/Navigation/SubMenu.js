import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Link } from "gatsby";

import styles from "./Navigation.module.scss";

function isSubLinkSelected(path, items) {
  return Object.keys(items).includes(path);
}

function SubMenu({ classNames, title, path, items }) {
  const [isOpened, setIsOpened] = useState(isSubLinkSelected(path, items));

  const renderItems = () => {
    if (!isOpened) return null;

    return (
      <div className={styles["submenu__items"]}>
        {Object.keys(items).map(key => (
          <Link key={key} to={key} activeClassName={classNames["active-item"]}>
            {items[key].label}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cx(styles["submenu"], {
        [styles["submenu--opened"]]: !!isOpened,
        [classNames["submenu"]]: Boolean(classNames["submenu"]),
      })}
      onClick={() => setIsOpened(!isOpened)}
    >
      <div className={styles["submenu__title"]}>{title}</div>
      {renderItems()}
    </div>
  );
}

SubMenu.propTypes = {
  items: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default SubMenu;
