import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import cx from "classnames";

import Navigation from "../Navigation";

import styles from "./Layout.module.scss";

const Layout = ({ withFooter, location, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className={styles["layout"]}>
      <Navigation
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        location={location}
      />
      <div
        className={cx(styles["layout__content"], {
          [styles["layout__content--collapsed"]]: isCollapsed,
        })}
      >
        <main>{children}</main>
        {withFooter && (
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        )}
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
