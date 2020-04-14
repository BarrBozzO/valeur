import React from "react";

import SEO from "components/Seo";
import Layout from "components/Layout";

import styles from "./About.module.scss";

const AboutPage = ({ mount, location }) => (
  <Layout mount={mount} location={location}>
    <SEO title="О проекте" />
    <div className={styles["about-page"]}>
      <h1>О проекте</h1>
      <p>Contacts</p>
    </div>
  </Layout>
);

export default AboutPage;
