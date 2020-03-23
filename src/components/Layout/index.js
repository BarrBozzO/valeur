import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

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

  return (
    <div className={styles["layout"]}>
      <Navigation location={location} />
      <div className={styles["layout__content"]}>
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
