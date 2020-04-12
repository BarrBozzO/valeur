import React from "react";
import { getRichText } from "utils";
import moment from "moment";

import Seo from "components/Seo";
import Layout from "components/Layout";

function Post({ pageContext: { post }, location, mount }) {
  const { title, slug, article, createdAt, metaDescription } = post;

  return (
    <>
      <Seo title={title} description={metaDescription} />
      <Layout mount={mount} location={location}>
        <h1>{title}</h1>
        <div>{slug}</div>
        <div>{getRichText(article)}</div>
        <div>{moment(createdAt).format("HH:MM DD-MM-YYYY")}</div>
      </Layout>
    </>
  );
}

export default Post;
