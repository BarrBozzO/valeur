import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import cx from "classnames";

import Navigation from "../Navigation";
import PageTransition from "components/PageTransition";
import { GlobalStateProvider } from "context/GlobalContextProvider";

import styles from "./Layout.module.scss";

const Layout = ({ location, children, mount }) => {
  const {
    navigation: { isCollapsed },
  } = useContext(GlobalStateProvider);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

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
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </PageTransition>
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
