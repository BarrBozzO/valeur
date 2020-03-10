import React from "react";
import { Link } from "gatsby";

import Layout from "components/Layout";
import SEO from "components/seo";

import styles from "./About.module.scss";

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <div className={styles["about-page"]}>
      <h1>About us</h1>
      <p>Contacts</p>
    </div>
  </Layout>
);

export default AboutPage;
