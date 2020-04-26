import React from "react";
import cx from "classnames";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "components/Layout";
import Seo from "components/Seo";

import styles from "./InvitationKit.module.scss";

function InvitationKit({
  pageContext: { kit },
  location,
  mount,
  data: { contentfulInvitationKit },
}) {
  const { title, description, metaDescription } = kit;
  const { image } = contentfulInvitationKit;

  const renderImageCover = image => {
    if (image) {
      const cover = Array.isArray(image) ? image[0] : image;
      if (cover.fluid) {
        const {
          details: {
            image: { width },
          },
        } = cover.file;

        return (
          <div className={styles["invitation-kit__cover"]}>
            <Img
              style={{ maxWidth: width <= 1024 ? width : 1024 }}
              imgStyle={{ objectFit: "contain" }}
              fluid={cover.fluid}
              className={styles["invitation-kit__cover-image"]}
            />
          </div>
        );
      }
    }

    return null;
  };

  return (
    <Layout location={location} mount={mount}>
      <Seo title={title} description={metaDescription} />
      <div className={styles["invitation-kit"]}>
        <h1 className={styles["invitation-kit__header"]}>{title}</h1>
        {renderImageCover(image)}
        <div className={styles["invitation-kit__description"]}>
          {description && description.internal && description.internal.content}
        </div>
      </div>
    </Layout>
  );
}

export default InvitationKit;

export const query = graphql`
  query SingleInvitationKit($slug: String!) {
    contentfulInvitationKit(slug: { eq: $slug }) {
      image {
        fluid(maxWidth: 1024, quality: 100) {
          ...GatsbyContentfulFluid_tracedSVG
        }
        file {
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
