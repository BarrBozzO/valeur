import React from "react";
import { navigate } from "@reach/router";
import TransitionLink from "gatsby-plugin-transition-link";
import { graphql } from "gatsby";
import cx from "classnames";

import SEO from "components/Seo";
import Layout from "components/Layout";
import Button from "components/Button";

import styles from "./Posts.module.scss";

const Posts = ({ data, mount, location }) => {
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

  const onClick = slug => {
    return () => navigate(`posts/${slug}`);
  };

  const renderPosts = () => {
    return (
      <div className={styles["posts__list"]}>
        {data.allContentfulPost.nodes.map(
          ({ id, slug, title, image, createdAt, description }) => (
            <div
              className={cx(styles["posts__list-item"], styles["post"])}
              key={id}
            >
              <Link to={`/posts/${slug}`}>
                <h2 className={styles["post__title"]}>{title}</h2>
              </Link>
              <div className={styles["post__created"]}>{createdAt}</div>

              {renderImageCover(image)}
              <div className={styles["post__description"]}>
                {description &&
                  description.internal &&
                  description.internal.content}
              </div>
              <div className={styles["post__read"]}>
                <Button onClick={onClick(slug)}>Читать далее</Button>
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <Layout location={location} mount={mount}>
      <SEO title="Posts" />
      <div className={styles["posts"]}>
        <h1 className={styles["posts__header"]}>Блог</h1>
        {renderPosts()}
      </div>
    </Layout>
  );
};

export default Posts;

export const query = graphql`
  {
    allContentfulPost(sort: { order: DESC, fields: createdAt }) {
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
        description {
          internal {
            content
          }
        }
        createdAt(formatString: "MMMM DD, YYYY", locale: "ru")
        image {
          file {
            url
          }
        }
      }
    }
  }
`;
