import React from "react";
import { Link } from "gatsby";
import { getRichText } from "utils";

import Layout from "components/Layout";

import styles from "./Post.module.scss";

function Post({ pageContext: { post, prev, next }, location }) {
  const { title, article, image, createdAt } = post;

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

  return (
    <Layout location={location}>
      <div className={styles["post"]}>
        <h1 className={styles["post__header"]}>{title}</h1>
        <div className={styles["post__createdAt"]}>{createdAt}</div>
        {renderImageCover(image)}
        <div className={styles["post__article"]}>{getRichText(article)}</div>

        <div className={styles["post__nav"]}>
          {prev && (
            <div>
              <Link to={`/posts/${prev.slug}`}>Prev</Link>
              {prev.title}
            </div>
          )}
          {next && (
            <div>
              <Link to={`/posts/${next.slug}`}>Next</Link>
              {next.title}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Post;
