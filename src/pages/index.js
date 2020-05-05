import React from "react";

import Video from "components/Video";
import Button from "components/Button";
import SEO from "components/Seo";
import Layout from "components/Layout";

import vFile from "assets/videos/test.mp4";

import styles from "./Home.module.scss";

const IndexPage = ({ location, mount }) => (
  <Layout mount={mount} location={location}>
    <SEO title="Главная" />
    <div className={styles["home"]}>
      <div className={styles["home__start"]}>
        <Video className={styles["home__background-video"]} source={vFile} />
        <h1>Valeur</h1>
        <div>
          <p>
            There’s a voice that keeps on calling me. Down the road, that’s
            where I’ll always be. Every stop I make, I make a new friend. Can’t
            stay for long, just turn around and I’m gone again. Maybe tomorrow,
            I’ll want to settle down, Until tomorrow, I’ll just keep moving on.
          </p>
          <p>
            Knight Rider, a shadowy flight into the dangerous world of a man who
            does not exist. Michael Knight, a young loner on a crusade to
            champion the cause of the innocent, the helpless in a world of
            criminals who operate above the law.
          </p>
          <p>
            This is my boss, Jonathan Hart, a self-made millionaire, he’s quite
            a guy. This is Mrs H., she’s gorgeous, she’s one lady who knows how
            to take care of herself. By the way, my name is Max. I take care of
            both of them, which ain’t easy, ’cause when they met it was MURDER!
          </p>
          <Button label="Заказать" />
        </div>
      </div>
      <div className={styles["home__about"]}>About</div>
      <div className={styles["home__reviews"]}>Reviews</div>
    </div>
  </Layout>
);

export default IndexPage;
