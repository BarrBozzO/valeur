import React from "react";

import styles from "./Navigation.module.scss";

function External() {
  return (
    <div className={styles["navigation__external"]}>
      <div>
        <div>instagram</div>
        <div>facebook</div>
      </div>
      <div className={styles["navigation__external-dev-by"]}>
        Developed by{" "}
        <a href="https://github.com/BarrBozzO/velour" target="_blank">
          BarrBozzO
        </a>
      </div>
    </div>
  );
}

export default External;
