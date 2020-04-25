import React from "react";
import { graphql } from "gatsby";
import cx from "classnames";
import Img from "gatsby-image";

import Link from "components/Link";
import SEO from "components/Seo";
import Layout from "components/Layout";

import styles from "./OnlineInvitations.module.scss";

const OnlineInvitationsPage = ({ data, mount, location }) => {
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
        {data.allContentfulOnlineInvitation.nodes.map(
          ({ id, slug, title, image, shortDescription }) => (
            <div
              className={cx(
                styles["online-invitations__grid-item"],
                styles["o-invitation"]
              )}
              key={id}
            >
              <Link to={`/portfolio/online-invitations/${slug}`}>
                <div className={styles["o-invitation__content"]}>
                  {renderImageCover(image)}
                  <div className={styles["o-invitation__content-hover"]}>
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
              </Link>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <Layout mount={mount} location={location}>
      <SEO title="Электронные пригласительные" />
      <div className={styles["online-invitations"]}>
        <h1 className={styles["online-invitations__header"]}>
          Электронные пригласительные
        </h1>
        {renderInvitations()}
      </div>
    </Layout>
  );
};

export default OnlineInvitationsPage;

export const query = graphql`
  {
    allContentfulOnlineInvitation {
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
