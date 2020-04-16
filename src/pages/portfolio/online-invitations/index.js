import React from "react";

import SEO from "components/Seo";
import Layout from "components/Layout";

import styles from "./OnlineInvitations.module.scss";

const OnlineInvitationsPage = ({ mount, location }) => (
  <Layout mount={mount} location={location}>
    <SEO title="Электронные пригласительные" />
    <div className={styles["online-invitations-page"]}>
      <h1>Электронные пригласительные</h1>
      <p></p>
    </div>
  </Layout>
);

export default OnlineInvitationsPage;
