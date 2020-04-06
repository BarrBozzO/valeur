import React from "react";
import { Link } from "gatsby";
import cx from "classnames";

import Layout from "components/Layout";
import Article from "./Article";

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
        <Article className={styles["post__article"]} data={article} />
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
