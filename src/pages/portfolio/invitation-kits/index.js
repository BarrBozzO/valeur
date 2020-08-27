import React, { useState } from "react";
import { graphql } from "gatsby";
import cx from "classnames";
import Img from "gatsby-image";

import SEO from "components/Seo";
import Layout from "components/Layout";
import Portal from "components/Portal";
import ImagesCarousel from "components/ImagesCarousel";

import styles from "./InvitationKits.module.scss";

const InvitationKitsPage = ({ data, mount, location }) => {
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
          <div className={styles["kit__cover"]}>
            <Img
              fluid={cover.fluid}
              imgStyle={{ objectFit: "cover" }}
              className={styles["kit__cover-image"]}
            />
          </div>
        );
      }
    }

    return null;
  };

  const renderKits = () => {
    return (
      <div className={styles["invitation-kits__grid"]}>
        {data.allContentfulInvitationPackage.nodes.map(
          ({ id, title, image, shortDescription }) => (
            <div
              className={cx(
                styles["invitation-kits__grid-item"],
                styles["kit"],
                {
                  [styles["kit--active"]]: current === id,
                }
              )}
              key={id}
            >
              <div className={styles["kit__content"]} onClick={handleClick(id)}>
                {renderImageCover(image)}
                <div className={styles["kit__content-hover"]}>
                  <div>
                    <h2 className={styles["kit__content-title"]}>{title}</h2>
                    <span className={styles["kit__content-description"]}>
                      {shortDescription}
                    </span>
                  </div>
                </div>
              </div>
              {renderPopupImages(id, image, title)}
            </div>
          )
        )}
      </div>
    );
  };

  const renderPopupImages = (id, images, title) => {
    if (current === null || current !== id) return null;

    return (
      <Portal isModal onClose={handleCloseCarousel}>
        <div className={styles["kit__popup"]}>
          <div className={styles["kit__popup-title"]}>{title}</div>
          <ImagesCarousel
            carouselClassNames={{
              controls: styles["kit__popup-carousel-controls"],
              controlElement: styles["kit__popup-carousel-controls-element"],
            }}
            images={Array.isArray(images) ? images : [images]}
          />
        </div>
      </Portal>
    );
  };

  return (
    <Layout mount={mount} location={location}>
      <SEO title="Комплекты пригласительных" />
      <div className={styles["invitation-kits"]}>
        <h1 className={styles["invitation-kits__header"]}>
          Комплекты пригласительных
        </h1>
        {renderKits()}
      </div>
    </Layout>
  );
};

export default InvitationKitsPage;

export const query = graphql`
  {
    allContentfulInvitationPackage {
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
