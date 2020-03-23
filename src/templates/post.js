import React from "react";
import { getRichText } from "utils";
import moment from "moment";

import Layout from "components/Layout";
import Seo from "components/Seo";

function Post({ pageContext: { post }, location }) {
  const { title, slug, article, createdAt, metaDescription } = post;

  return (
    <Layout location={location}>
      <Seo title={title} description={metaDescription} />
      <h1>{title}</h1>
      <div>{slug}</div>
      <div>{getRichText(article)}</div>
      <div>{moment(createdAt).format("HH:MM DD-MM-YYYY")}</div>
    </Layout>
  );
}

export default Post;
