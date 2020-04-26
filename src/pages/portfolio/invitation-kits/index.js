import React from "react";
import { graphql } from "gatsby";
import cx from "classnames";
import Img from "gatsby-image";

import Link from "components/Link";
import SEO from "components/Seo";
import Layout from "components/Layout";

import styles from "./InvitationKits.module.scss";

const InvitationKitsPage = ({ data, mount, location }) => {
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
        {data.allContentfulInvitationKit.nodes.map(
          ({ id, slug, title, image, shortDescription }) => (
            <div
              className={cx(
                styles["invitation-kits__grid-item"],
                styles["kit"]
              )}
              key={id}
            >
              <Link to={`/portfolio/invitation-kits/${slug}`}>
                <div className={styles["kit__content"]}>
                  {renderImageCover(image)}
                  <div className={styles["kit__content-hover"]}>
                    <h2 className={styles["kit__content-title"]}>{title}</h2>
                    <span className={styles["kit__content-description"]}>
                      {shortDescription}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )
        )}
      </div>
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
          fluid(maxWidth: 1024, quality: 100) {
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
      }
    }
  }
`;
