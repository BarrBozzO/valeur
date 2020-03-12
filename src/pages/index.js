import React from "react";

import Layout from "../components/Layout";
import Video from "../components/Video";
import Button from "../components/Button";
import SEO from "../components/seo";

import vFile from "../assets/videos/test.mp4";

import styles from "./Home.module.scss";

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Layout withFooter={false}>
      <div className={styles["home"]}>
        <Video className={styles["home__background-video"]} source={vFile} />
        <h1>Valour - мастерская</h1>
        <div>
          <p>Blalbalblablalbalbalballlbalbl alb alblalb lablalba</p>
          <Button label="Заказать" />
        </div>
      </div>
    </Layout>
  </>
);

export default IndexPage;
