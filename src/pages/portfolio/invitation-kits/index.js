import React from "react";

import SEO from "components/Seo";
import Layout from "components/Layout";

import styles from "./InvitationKits.module.scss";

const InvitationKitsPage = ({ mount, location }) => (
  <Layout mount={mount} location={location}>
    <SEO title="Комплекты пригласительных" />
    <div className={styles["invitation-kits-page"]}>
      <h1>Комплекты пригласительных</h1>
      <p></p>
    </div>
  </Layout>
);

export default InvitationKitsPage;
