import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

function post({ pageContext: { post } }) {
  return (
    <Layout>
      <h1>{post.title}</h1>
      <div>{post.slug}</div>
      <Link to="/">Go home</Link>
    </Layout>
  )
}

export default post
