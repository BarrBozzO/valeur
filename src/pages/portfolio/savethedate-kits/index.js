import React, { useState } from "react";
import { graphql } from "gatsby";
import cx from "classnames";
import Img from "gatsby-image";

import SEO from "components/Seo";
import Layout from "components/Layout";
import Portal from "components/Portal";
import ImagesCarousel from "components/ImagesCarousel";

import styles from "./SavethedateKits.module.scss";

const SavethedatePage = ({ data, mount, location }) => {
  const [current, setCurrent] = useState(null);

  const handleClick = id => () => setCurrent(id);

  const handleCloseCarousel = () => {
    setCurrent(null);
  };

  const renderImageCover = image => {
    if (image) {
      const cover = Array.isArray(image) ? image[0] : image;
      if (cover.fluid) {
        return (
          <div className={styles["o-invitation__cover"]}>
            <Img
              fluid={cover.fluid}
              imgStyle={{ objectFit: "cover" }}
              className={styles["o-invitation__cover-image"]}
            />
          </div>
        );
      }
    }

    return null;
  };

  const renderInvitations = () => {
    return (
      <div className={styles["online-invitations__grid"]}>
        {data.allContentfulSaveTheDate.nodes.map(
          ({ id, title, image, shortDescription }) => (
            <div
              className={cx(
                styles["online-invitations__grid-item"],
                styles["o-invitation"],
                {
                  [styles["o-invitation--active"]]: current === id,
                }
              )}
              key={id}
            >
              <div
                className={styles["o-invitation__content"]}
                onClick={handleClick(id)}
              >
                {renderImageCover(image)}
                <div className={styles["o-invitation__content-hover"]}>
                  <div>
                    <h2 className={styles["o-invitation__content-title"]}>
                      {title}
                    </h2>
                    <span
                      className={styles["o-invitation__content-description"]}
                    >
                      {shortDescription}
                    </span>
                  </div>
                </div>
              </div>
              {renderPopupImages(id, image)}
            </div>
          )
        )}
      </div>
    );
  };

  const renderPopupImages = (id, images) => {
    if (current === null || current !== id) return null;

    return (
      <Portal isModal onClose={handleCloseCarousel}>
        <ImagesCarousel images={Array.isArray(images) ? images : [images]} />
      </Portal>
    );
  };

  return (
    <Layout mount={mount} location={location}>
      <SEO title="Save the date" />
      <div className={styles["online-invitations"]}>
        <h1 className={styles["online-invitations__header"]}>Save the date</h1>
        {renderInvitations()}
      </div>
    </Layout>
  );
};

export default SavethedatePage;

export const query = graphql`
  {
    allContentfulSaveTheDate {
      nodes {
        id
        slug
        title
        shortDescription
        createdAt(formatString: "MMMM DD, YYYY", locale: "ru")
        image {
          fluid(maxWidth: 1920, quality: 100) {
            ...GatsbyContentfulFluid
          }
          file {
            url
            details {
              image {
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;
