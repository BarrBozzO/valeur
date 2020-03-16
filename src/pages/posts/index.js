import React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";

import Layout from "components/Layout";
import SEO from "components/seo";

const Posts = ({ data, location }) => {
  const renderPosts = () => {
    return (
      <ul>
        {data.allContentfulPost.nodes.map(({ id, slug, title }) => (
          <li key={id}>
            <Link to={`/posts/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Layout location={location}>
      <SEO title="Posts" />
      <h1>Posts</h1>
      {renderPosts()}
    </Layout>
  );
};

export default Posts;

export const query = graphql`
  {
    allContentfulPost {
      nodes {
        id
        slug
        title
      }
    }
  }
`;
