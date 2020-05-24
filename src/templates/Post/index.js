import React from "react";
import cx from "classnames";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "components/Layout";
import Seo from "components/Seo";
import Link from "components/Link";

import Article from "./Article";

import styles from "./Post.module.scss";

function Post({
  pageContext: { post, prev, next, assetsMap },
  location,
  mount,
  data: { contentfulPost },
}) {
  const { title, article, createdAt, metaDescription } = post;
  const { image } = contentfulPost;

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
              style={{ maxWidth: width <= 1024 ? width : 1024 }}
              imgStyle={{ objectFit: "contain" }}
              fluid={cover.fluid}
              className={styles["post__cover-image"]}
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
      <div className={styles["post"]}>
        <h1 className={styles["post__header"]}>{title}</h1>
        {renderImageCover(image)}
        <div className={styles["post__createdAt"]}>{createdAt}</div>
        <Article
          className={styles["post__article"]}
          data={article}
          assets={assetsMap}
        />
        <div className={styles["post__nav"]}>
          <div
            className={cx(
              styles["post__nav-item"],
              styles["post__nav-item--prev"]
            )}
          >
            {prev && (
              <>
                <Link to={`/posts/${prev.slug}`}>
                  <span>Предыдущий</span>
                  <div className={styles["post__nav-title"]}>{prev.title}</div>
                </Link>
              </>
            )}
          </div>
          <div className={styles["post__nav-divider"]} />
          <div
            className={cx(
              styles["post__nav-item"],
              styles["post__nav-item--next"]
            )}
          >
            {next && (
              <>
                <Link to={`/posts/${next.slug}`}>
                  <span>Следующий</span>
                  <div className={styles["post__nav-title"]}>{next.title}</div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Post;

export const query = graphql`
  query SinglePost($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
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
