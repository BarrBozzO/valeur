import React from "react";

import Layout from "components/Layout";
import SEO from "components/seo";

import styles from "./Contacts.module.scss";

const ContactsPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Контакты" />
    <div className={styles["contacts-page"]}>
      <h1>Контакты</h1>
      <p>z</p>
    </div>
  </Layout>
);

export default ContactsPage;
