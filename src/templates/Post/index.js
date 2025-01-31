import React, { useRef, useContext } from "react";
import cx from "classnames";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import scrollTo from "gatsby-plugin-smoothscroll";

import { GlobalStateProvider } from "context/GlobalContextProvider";

import Layout from "components/Layout";
import Seo from "components/Seo";
import Link from "components/Link";
import ScrollProgressBar from "components/ScrollProgressBar";

import Article from "./Article";

import styles from "./Post.module.scss";

function handlePostRedirect() {
  scrollTo("body");
}

function Post({
  pageContext: { post, prev, next, assetsMap },
  location,
  mount,
  data: { contentfulPost },
}) {
  const {
    navigation: { isCollapsed },
  } = useContext(GlobalStateProvider);
  const { title, article, createdAt, metaDescription } = post;
  const { image } = contentfulPost;
  const postRef = useRef(null);

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
              style={{ maxWidth: width <= 1280 ? width : 1280 }}
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
      <ScrollProgressBar
        className={cx(styles["post__progress-bar"], {
          [styles["post__progress-bar--collapsed"]]: isCollapsed,
        })}
        ref={postRef}
      />
      <div className={styles["post"]} ref={postRef}>
        {renderImageCover(image)}
        <h1 className={styles["post__header"]}>{title}</h1>
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
                <Link to={`/posts/${prev.slug}`} onClick={handlePostRedirect}>
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
                <Link to={`/posts/${next.slug}`} onClick={handlePostRedirect}>
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
        fluid(maxWidth: 1280, quality: 100) {
          ...GatsbyContentfulFluid
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
