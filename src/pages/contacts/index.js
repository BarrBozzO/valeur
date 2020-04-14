import React from "react";

import SEO from "components/Seo";
import Layout from "components/Layout";

import styles from "./Contacts.module.scss";

const ContactsPage = ({ mount, location }) => (
  <Layout mount={mount} location={location}>
    <SEO title="Контакты" />
    <div className={styles["contacts-page"]}>
      <h1>Контакты</h1>
      <p>z</p>
    </div>
  </Layout>
);

export default ContactsPage;
