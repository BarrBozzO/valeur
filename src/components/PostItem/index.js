import React from "react";
import Img from "gatsby-image";
import Link from "components/Link";
import cx from "classnames";

import styles from "./PostItem.module.scss";

const MAX_WIDTH = 1024;

function PostItem({
  post: { id, slug, title, image, createdAt, description },
  className,
  onClick,
}) {
  let postImage = null;
  if (image) {
    const cover = Array.isArray(image) ? image[0] : image;
    if (cover.fluid) {
      const {
        details: {
          image: { width },
        },
      } = cover.file;

      postImage = (
        <div className={styles["posts__item-cover"]}>
          <Img
            style={{
              maxWidth: width <= MAX_WIDTH ? width : MAX_WIDTH,
            }}
            fluid={cover.fluid}
            className={styles["posts__item-cover-image"]}
          />
        </div>
      );
    }
  }

  return (
    <div
      className={cx(styles["posts__item"], {
        [className]: Boolean(className),
      })}
      onClick={onClick}
    >
      <Link to={`/posts/${slug}`}>
        {postImage}

        <h3 className={styles["posts__item-title"]}>{title}</h3>

        <div className={styles["posts__item-created"]}>{createdAt}</div>
        <div className={styles["posts__item-description"]}>
          {description && description.internal && description.internal.content}
        </div>
      </Link>
    </div>
  );
}

export default PostItem;
