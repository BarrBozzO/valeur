import React, { forwardRef, useEffect, useState } from "react";
import cx from "classnames";
import throttle from "lodash/throttle";

import styles from "./ScrollProgressBar.module.scss";

function listenScroll(el, cb) {
  return e => {
    const scrollFromTop = document.documentElement.scrollTop;
    const scrollHeight = el.scrollHeight;
    const height = document.documentElement.clientHeight;

    const progress = Number.parseInt(
      (Math.min(scrollFromTop, scrollHeight - height) * 100) /
        (scrollHeight - height)
    );

    cb(Number.isNaN(progress) ? 0 : progress);
  };
}

function ScrollProgressBar(props, ref) {
  const [progress, setProgress] = useState(0);
  const [target, setTarget] = useState(ref.current);

  useEffect(() => {
    if (ref.current && (target === null || target === ref.current)) {
      try {
        setTarget(ref.current);
        const throttledListenScroll = throttle(
          listenScroll(ref.current, setProgress),
          250
        );
        window.addEventListener("scroll", throttledListenScroll);
        return () =>
          window.removeEventListener("scroll", throttledListenScroll);
      } catch (err) {
        console.error(err);
      }
    }
  }, [ref.current]);

  return (
    <div
      className={cx(styles["scroll-progress-bar__container"], props.className)}
    >
      <div
        className={styles["scroll-progress-bar"]}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default forwardRef(ScrollProgressBar);
