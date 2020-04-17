import React from "react";
import { graphql } from "gatsby";
import cx from "classnames";
import moment from "moment";

import Link from "components/Link";
import SEO from "components/Seo";
import Layout from "components/Layout";

import styles from "./OnlineInvitations.module.scss";

const OnlineInvitationsPage = ({ data, mount, location }) => {
  const renderImageCover = image => {
    if (image) {
      const cover = Array.isArray(image) ? image[0] : image;
      if (cover.file && cover.file.url) {
        return (
          <div className={styles["o-invitation__cover"]}>
            <img
              src={cover.file.url}
              className={styles["o-invitation__image"]}
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
          ({ id, slug, title, image, createdAt, description }) => (
            <div
              className={cx(
                styles["online-invitations__grid-item"],
                styles["o-invitation"]
              )}
              key={id}
            >
              {renderImageCover(image)}
              <div className={styles["o-invitation__content"]}>
                <Link to={`/portfolio/online-invitations/${slug}`}>
                  <h2 className={styles["o-invitation__content-title"]}>
                    {title}
                  </h2>
                </Link>
                <div className={styles["o-invitation__content-created"]}>
                  {moment(createdAt).format("HH:MM DD-MM-YYYY")}
                </div>
                <div>
                  {description &&
                    description.internal &&
                    description.internal.content}
                </div>
              </div>
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
        <h1>Электронные пригласительные</h1>
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
        description {
          internal {
            content
          }
        }
        createdAt
        image {
          file {
            url
          }
        }
      }
    }
  }
`;
