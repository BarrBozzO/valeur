import React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";
import moment from "moment";
import cx from "classnames";
import { getRichText } from "utils";

import Layout from "components/Layout";
import SEO from "components/seo";

import styles from "./Posts.module.scss";

const Posts = ({ data, location }) => {
  const renderImageCover = image => {
    if (image) {
      const cover = Array.isArray(image) ? image[0] : image;
      if (cover.file && cover.file.url) {
        return (
          <div className={styles["post__cover"]}>
            <img src={cover.file.url} className={styles["post__image"]} />
          </div>
        );
      }
    }

    return null;
  };

  const renderPosts = () => {
    return (
      <div className={styles["posts__list"]}>
        {data.allContentfulPost.nodes.map(
          ({ id, slug, title, image, createdAt, article }) => (
            <div
              className={cx(styles["posts__list-item"], styles["post"])}
              key={id}
            >
              {renderImageCover(image)}
              <div className={styles["post__content"]}>
                <Link to={`/posts/${slug}`}>
                  <h2 className={styles["post__content-title"]}>{title}</h2>
                </Link>
                <div className={styles["post__content-created"]}>
                  {moment(createdAt).format("HH:MM DD-MM-YYYY")}
                </div>
                <div>{getRichText(article)}</div>
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <Layout location={location}>
      <SEO title="Posts" />
      <div className={styles["posts"]}>
        <h1>Posts</h1>
        {renderPosts()}
      </div>
    </Layout>
  );
};

export default Posts;

export const query = graphql`
  {
    allContentfulPost {
      nodes {
        id
        slug
        title
        article {
          id
          content {
            content {
              value
              nodeType
            }
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
