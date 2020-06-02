import React from "react";
import cx from "classnames";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "components/Layout";
import Carousel from "components/Carousel";
import Button from "components/Button";
import Seo from "components/Seo";

import styles from "./OnlineInvitation.module.scss";

function OnlineInvitation({
  pageContext: { invitation },
  location,
  mount,
  data: { contentfulOnlineInvitation },
}) {
  const { title, description, metaDescription } = invitation;
  const { image } = contentfulOnlineInvitation;

  const renderImage = image => {
    if (image.fluid) {
      const {
        url,
        details: {
          image: { width, height },
        },
      } = image.file;
      const imgStyle = {
        objectFit: "contain",
        maxHeight: "100%",
        maxWidth: "100%",
      };

      return (
        <Img
          style={{ width: "100%", height: "100%" }}
          imgStyle={imgStyle}
          fluid={image.fluid}
        />
      );
    }

    return null;
  };

  const renderImagesCarousel = () => {
    const items = Array.isArray(image) ? image : [image];
    return (
      <div className={styles["online-invitation__images"]}>
        <Carousel
          containerStyle={{ width: "100%", height: "100%" }}
          slideStyle={{ width: "100%", height: "100%", overflow: "hidden" }}
        >
          {items.map(i => (
            <div className={styles["online-invitation__images-item"]}>
              {renderImage(i)}
            </div>
          ))}
        </Carousel>
      </div>
    );
  };

  return (
    <Layout
      className={styles["online-invitation__wrapper"]}
      location={location}
      mount={mount}
    >
      <Seo title={title} description={metaDescription} />
      <div className={styles["online-invitation"]}>
        <h1 className={styles["online-invitation__header"]}>{title}</h1>
        <div className={styles["online-invitation__content"]}>
          {renderImagesCarousel()}
          <div className={styles["online-invitation__description"]}>
            {description &&
              description.internal &&
              description.internal.content}
            <div className={styles["online-invitation__order-container"]}>
              <Button className={styles["online-invitation__order"]} secondary>
                Заказать
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OnlineInvitation;

export const query = graphql`
  query SingleOnlineInvitation($slug: String!) {
    contentfulOnlineInvitation(slug: { eq: $slug }) {
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
`;
