import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import cx from "classnames";

import CloseIcon from "assets/icons/close.svg";

import styles from "./Portal.module.scss";

function Portal(props) {
  const portal = document.getElementById("portal");
  const wrapper = document.createElement("div");
  const body = document.getElementsByTagName("body")[0];
  let content = null;

  useEffect(() => {
    portal.appendChild(wrapper);
    body.style.overflow = "hidden";

    return () => {
      portal.removeChild(wrapper);
      body.style.overflow = "auto";
    };
  }, [portal, wrapper]);

  const handleClose = () => {
    props.onClose();
  };

  content = (
    <div
      className={cx(styles["portal__content"], {
        [styles["portal__content--modal"]]: props.isModal,
      })}
    >
      <div className={styles["portal__content-close"]} onClick={handleClose}>
        <CloseIcon />
      </div>
      {props.children}
    </div>
  );

  return createPortal(content, wrapper);
}

export default Portal;
