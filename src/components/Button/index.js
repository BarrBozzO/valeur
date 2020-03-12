import React from "react";
import cx from "classnames";

import styles from "./Button.module.scss";

function Button({
  onClick,
  className,
  secondary,
  link,
  label,
  children,
  ...otherProps
}) {
  return (
    <button
      className={cx(styles["primary-button"], {
        [styles["primary-button--secondary"]]: Boolean(secondary),
        [styles["primary-button--link"]]: Boolean(link),
        className: Boolean(className),
      })}
      onClick={onClick}
      {...otherProps}
    >
      {children || label}
    </button>
  );
}

export default Button;
