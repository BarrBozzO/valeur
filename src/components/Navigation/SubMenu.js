import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { CSSTransition } from "react-transition-group";
import { TransitionState } from "gatsby-plugin-transition-link";
import Link from "components/Link";

import styles from "./Navigation.module.scss";
import "./NavigationTransition.scss";

const ANIMATION_DURATION = 300;

function isSubLinkSelected(path, items) {
  return Object.keys(items).includes(path);
}

function SubMenu({ classNames, title, path, items, transitionProps, onClose }) {
  const [isOpened, setIsOpened] = useState(isSubLinkSelected(path, items));

  useEffect(() => {
    if (
      !transitionProps.mount &&
      transitionProps.transitionStatus === "exiting" &&
      isOpened &&
      !isSubLinkSelected(transitionProps.exit.state.next, items)
    ) {
      setIsOpened(false);
    }
  }, [transitionProps.mount]);

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
            <Link
              key={key}
              to={key}
              className={styles["submenu__item"]}
              activeClassName={classNames["active-item"]}
              onClick={onClose}
            >
              {items[key].label}
            </Link>
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
    >
      <div
        className={styles["submenu__title"]}
        onClick={() => setIsOpened(!isOpened)}
      >
        {title}
      </div>
      {renderItems()}
    </div>
  );
}

SubMenu.propTypes = {
  items: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

// as component
const withTransitionState = Component => {
  return props => {
    return (
      <TransitionState>
        {transitionProps => (
          <Component {...props} transitionProps={transitionProps} />
        )}
      </TransitionState>
    );
  };
};

export default withTransitionState(SubMenu);
