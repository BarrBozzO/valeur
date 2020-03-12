import React from "react";
import { Link } from "gatsby";

import Layout from "components/Layout";

function Post({ pageContext: { post } }) {
  return (
    <Layout>
      <h1>{post.title}</h1>
      <div>{post.slug}</div>
      <Link to="/">Go home</Link>
    </Layout>
  );
}

export default Post;
