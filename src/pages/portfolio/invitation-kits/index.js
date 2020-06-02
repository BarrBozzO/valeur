import React, { useState } from "react";
import { graphql } from "gatsby";
import cx from "classnames";
import Img from "gatsby-image";

import Link from "components/Link";
import SEO from "components/Seo";
import Layout from "components/Layout";
import Portal from "components/Portal";

import LinkIcon from "assets/icons/link.svg";
import FullScreenIcon from "assets/icons/resize.svg";

import ImagesCarousel from "./ImagesCarousel";

import styles from "./InvitationKits.module.scss";

const InvitationKitsPage = ({ data, mount, location }) => {
  const [current, setCurrent] = useState(null);

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

  const handleClick = id => () => setCurrent(id);

  const handleCloseCarousel = () => {
    setCurrent(null);
  };

  const renderKits = () => {
    return (
      <div className={styles["invitation-kits__grid"]}>
        {data.allContentfulInvitationKit.nodes.map(
          ({ id, slug, title, image, shortDescription }) => (
            <div
              className={cx(
                styles["invitation-kits__grid-item"],
                styles["kit"]
              )}
              key={id}
            >
              <div className={styles["kit__content"]}>
                {renderImageCover(image)}
                <div
                  className={styles["kit__content-hover"]}
                  onClick={handleClick(id)}
                >
                  <h2 className={styles["kit__content-title"]}>{title}</h2>
                  <span className={styles["kit__content-description"]}>
                    {shortDescription}
                  </span>
                  {/* <div className={styles["kit__fullscreen"]}>
                    <FullScreenIcon />
                  </div> */}
                  <a
                    target="_blank"
                    className={styles["kit__link"]}
                    href={`/portfolio/invitation-kits/${slug}`}
                    onClick={e => e.stopPropagation()}
                  >
                    <LinkIcon />
                  </a>
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
    allContentfulInvitationKit {
      nodes {
        id
        slug
        title
        shortDescription
        createdAt(formatString: "MMMM DD, YYYY", locale: "ru")
        image {
          fluid(maxWidth: 1920, quality: 100) {
            ...GatsbyContentfulFluid_tracedSVG
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
