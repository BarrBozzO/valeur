import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Posts = ({ data }) => {
  const renderPosts = () => {
    return (
      <ul>
        {data.allContentfulPost.nodes.map(({ id, slug, title }) => (
          <li key={id}>
            <Link to={`/posts/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Layout>
      <SEO title="Posts" />
      <h1>Posts</h1>
      {renderPosts()}
      <Link to="/">Go home</Link>
    </Layout>
  )
}

export default Posts

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
`
