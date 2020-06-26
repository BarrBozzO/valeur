import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import cx from "classnames";

import CloseIcon from "assets/icons/close.svg";

import styles from "./Portal.module.scss";

function Portal(props) {
  const portal = document.getElementById("portal");
  const wrapper = document.createElement("div");
  let content = null;

  useEffect(() => {
    portal.appendChild(wrapper);
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;

    return () => {
      const body = document.body;
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      portal.removeChild(wrapper);
    };
  }, [portal, wrapper]);

  const handleClose = () => {
    props.onClose();
  };

  content = (
    <div
      className={cx(styles["portal__content"], {
        [styles["portal__content--modal"]]: props.isModal,
        [props.classNames.content]: Boolean(props.classNames.content),
      })}
    >
      <div
        className={cx(styles["portal__content-close"], {
          [props.classNames.close]: Boolean(props.classNames.close),
        })}
        onClick={handleClose}
      >
        <CloseIcon />
      </div>
      {props.children}
    </div>
  );

  return createPortal(content, wrapper);
}

Portal.defaultProps = {
  classNames: {},
};

export default Portal;
