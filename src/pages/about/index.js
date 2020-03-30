import React from "react";

import Layout from "components/Layout";
import SEO from "components/Seo";

import styles from "./About.module.scss";

const AboutPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="О проекте" />
    <div className={styles["about-page"]}>
      <h1>О проекте</h1>
      <p>Contacts</p>
    </div>
  </Layout>
);

export default AboutPage;
