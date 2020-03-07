import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h1>About us</h1>
    <p>Contacts</p>
    <Link to="/">Go home</Link>
  </Layout>
)

export default AboutPage
