import React, { useRef, useContext } from "react";
import cx from "classnames";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import scrollTo from "gatsby-plugin-smoothscroll";

import { GlobalStateProvider } from "context/GlobalContextProvider";

import Layout from "components/Layout";
import Seo from "components/Seo";
import Link from "components/Link";
import PostItem from "components/PostItem";
import ScrollProgressBar from "components/ScrollProgressBar";

import Article from "./Article";

import styles from "./Post.module.scss";

function handlePostRedirect() {
  scrollTo("body");
}

function Post({
  pageContext: { post, assetsMap },
  location,
  mount,
  data: { contentfulPost, nextPost, prevPost },
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

  const readMorePosts = [prevPost, nextPost].filter(post => !!post);

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
        {readMorePosts.length && (
          <div className={styles["post__nav"]}>
            <h2>Читайте также</h2>
            <div className={styles["post__nav-items"]}>
              {readMorePosts.map(post => (
                <PostItem
                  key={post.id}
                  className={styles["post__nav-item"]}
                  post={post}
                  onClick={handlePostRedirect}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Post;

export const query = graphql`
  query SinglePost($slug: String!, $next: String = "", $prev: String = "") {
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
    nextPost: contentfulPost(id: { eq: $next }) {
      id
      slug
      title
      description {
        internal {
          content
        }
      }
      createdAt(formatString: "MMMM DD, YYYY", locale: "ru")
      image {
        fluid(maxWidth: 600) {
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
    prevPost: contentfulPost(id: { eq: $prev }) {
      id
      slug
      title
      description {
        internal {
          content
        }
      }
      createdAt(formatString: "MMMM DD, YYYY", locale: "ru")
      image {
        fluid(maxWidth: 600) {
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
