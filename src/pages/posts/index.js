import React from "react";
import { graphql } from "gatsby";
import cx from "classnames";
import Img from "gatsby-image";

import SEO from "components/Seo";
import Layout from "components/Layout";
import Button from "components/Button";
import Link from "components/Link";
import { useTriggerTransition } from "gatsby-plugin-transition-link";

import styles from "./Posts.module.scss";

const TRANSITION_LENGTH = 0.4;
const MAX_WIDTH = 1024;

const Posts = ({ data, mount, location }) => {
  const triggerTransition = useTriggerTransition({
    exit: {
      length: TRANSITION_LENGTH,
    },
    entry: {
      delay: TRANSITION_LENGTH,
    },
  });

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
          <div className={styles["post__cover"]}>
            <Img
              style={{ maxWidth: width <= MAX_WIDTH ? width : MAX_WIDTH }}
              fluid={cover.fluid}
              className={styles["post__cover-image"]}
            />
          </div>
        );
      }
    }

    return null;
  };

  const onClick = slug => {
    return () => triggerTransition({ to: `/posts/${slug}` });
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
              {renderImageCover(image)}
              <Link to={`/posts/${slug}`}>
                <h2 className={styles["post__title"]}>{title}</h2>
              </Link>
              <div className={styles["post__created"]}>{createdAt}</div>
              <div className={styles["post__description"]}>
                {description &&
                  description.internal &&
                  description.internal.content}
              </div>
              <div className={styles["post__read"]}>
                <Button
                  className={styles["post__read-button"]}
                  secondary
                  onClick={onClick(slug)}
                >
                  Читать далее
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <Layout location={location} mount={mount}>
      <SEO title="Блог" />
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
  }
`;
