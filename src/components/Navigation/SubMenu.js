import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { CSSTransition } from "react-transition-group";
import TransitionLink from "gatsby-plugin-transition-link";

import styles from "./Navigation.module.scss";
import "./NavigationTransition.scss";

const ANIMATION_DURATION = 300;
const TRANSITION_LENGTH = 1.5;

function isSubLinkSelected(path, items) {
  return Object.keys(items).includes(path);
}

function SubMenu({ classNames, title, path, items }) {
  const [isOpened, setIsOpened] = useState(isSubLinkSelected(path, items));

  const renderItems = () => {
    return (
      <CSSTransition
        in={isOpened}
        timeout={ANIMATION_DURATION}
        unmountOnExit
        classNames={cx("submenu__items-transition")}
      >
        <div
          className={cx(
            styles["submenu__items"],
            `submenu__items-transition--${Object.keys(items).length}`
          )}
        >
          {Object.keys(items).map(key => (
            <TransitionLink
              key={key}
              to={key}
              activeClassName={classNames["active-item"]}
              exit={{
                length: TRANSITION_LENGTH,
              }}
              entry={{
                delay: TRANSITION_LENGTH,
              }}
            >
              {items[key].label}
            </TransitionLink>
          ))}
        </div>
      </CSSTransition>
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
