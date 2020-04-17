import React from "react";
import cx from "classnames";

import Layout from "components/Layout";
import Seo from "components/Seo";
import Link from "components/Link";

import styles from "./OnlineInvitation.module.scss";

function OnlineInvitation({
  pageContext: { invitation, prev, next },
  location,
  mount,
}) {
  const { title, description, image, createdAt, metaDescription } = invitation;

  const renderImageCover = image => {
    if (image) {
      const cover = Array.isArray(image) ? image[0] : image;
      if (cover.file && cover.file.url) {
        return (
          <div className={styles["online-invitation__cover"]}>
            <img
              src={cover.file.url}
              className={styles["online-invitation__image"]}
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
      <div className={styles["online-invitation"]}>
        <h1 className={styles["online-invitation__header"]}>{title}</h1>
        <div className={styles["online-invitation__createdAt"]}>
          {createdAt}
        </div>
        {renderImageCover(image)}
        {description && description.internal && description.internal.content}
        <div className={styles["online-invitation__nav"]}>
          <div
            className={cx(
              styles["online-invitation__nav-item"],
              styles["online-invitation__nav-item--prev"]
            )}
          >
            {prev && (
              <>
                <Link to={`/portfolio/online-invitations/${prev.slug}`}>
                  <span>Предыдущий</span>
                  <div className={styles["online-invitation__nav-title"]}>
                    {prev.title}
                  </div>
                </Link>
              </>
            )}
          </div>
          <div className={styles["online-invitation__nav-divider"]} />
          <div
            className={cx(
              styles["online-invitation__nav-item"],
              styles["online-invitation__nav-item--next"]
            )}
          >
            {next && (
              <>
                <Link to={`/portfolio/online-invitations/${next.slug}`}>
                  <span>Следующий</span>
                  <div className={styles["online-invitation__nav-title"]}>
                    {next.title}
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OnlineInvitation;
