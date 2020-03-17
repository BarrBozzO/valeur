import React from "react";
import { getRichText } from "utils";
import moment from "moment";

import Layout from "components/Layout";

function Post({ pageContext: { post } }) {
  const { title, slug, article, createdAt } = post;

  return (
    <Layout>
      <h1>{title}</h1>
      <div>{slug}</div>
      <div>{getRichText(article)}</div>
      <div>{moment(createdAt).format("HH:MM DD-MM-YYYY")}</div>
    </Layout>
  );
}

export default Post;
