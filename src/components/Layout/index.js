import React, { useContext } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Navigation from "../Navigation";
import Footer from "./Footer";
import PageTransition from "components/PageTransition";
import { GlobalStateProvider } from "context/GlobalContextProvider";

import styles from "./Layout.module.scss";

const Layout = ({ location, children, mount }) => {
  const {
    navigation: { isCollapsed },
  } = useContext(GlobalStateProvider);

  return (
    <div className={styles["layout"]}>
      <Navigation isCollapsed={isCollapsed} location={location} />
      <div
        className={cx(styles["layout__content"], {
          [styles["layout__content--collapsed"]]: isCollapsed,
        })}
      >
        <PageTransition mount={mount}>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  withFooter: PropTypes.bool,
};

Layout.defaultProps = {
  withFooter: true,
};

export default Layout;
