import React from "react";

import Layout from "components/Layout";

import styles from "./Contacts.module.scss";

const ContactsSuccessPage = ({ mount, location }) => (
  <Layout mount={mount} location={location}>
    <div className={styles["contacts-success"]}>
      <h1 className={styles["contacts-success__header"]}>
        Спасибо за обращение!
        <br />
        <br />
        Мы свяжемся с вами в ближайшее время.
      </h1>
    </div>
  </Layout>
);

export default ContactsSuccessPage;
