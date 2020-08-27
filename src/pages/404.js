import React from "react";

import SEO from "components/Seo";
import Layout from "components/Layout";

const NotFoundPage = ({ location, mount }) => (
  <Layout location={location} mount={mount}>
    <SEO title="404: Страница не найдена" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
