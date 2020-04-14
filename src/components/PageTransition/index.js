import React from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./PageTransition.module.scss";

const TRANSITION_TIMEOUT = 400;

function PageTransition({ mount, children }) {
  return (
    <CSSTransition
      in={mount}
      timeout={TRANSITION_TIMEOUT}
      classNames={{
        appear: styles["page__transition--appear"],
        appearActive: styles["page__transition--appear-active"],
        appearDone: styles["page__transition--appear-done"],
        enter: styles["page__transition--enter"],
        enterActive: styles["page__transition--enter-active"],
        enterDone: styles["page__transition--enter-done"],
        exit: styles["page__transition--exit"],
        exitActive: styles["page__transition--exit-active"],
        exitDone: styles["page__transition--exit-done"],
      }}
      mountOnEnter
      unmountOnExit
    >
      <div>{children}</div>
    </CSSTransition>
  );
}

export default PageTransition;
