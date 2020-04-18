const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        styles: path.resolve(__dirname, "src/styles"),
        assets: path.resolve(__dirname, "src/assets"),
        components: path.resolve(__dirname, "src/components"),
        utils: path.resolve(__dirname, "src/utils"),
        context: path.resolve(__dirname, "src/context"),
      },
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      query Posts {
        allContentfulPost {
          edges {
            node {
              id
              article {
                id
                content {
                  content {
                    value
                    nodeType
                    marks {
                      type
                    }
                    content {
                      value
                      nodeType
                      content {
                        value
                        nodeType
                      }
                    }
                    data {
                      uri
                    }
                  }
                  nodeType
                  data {
                    target {
                      sys {
                        type
                        id
                        contentful_id
                      }
                    }
                  }
                }
              }
              title
              metaDescription
              slug
              createdAt(formatString: "MMMM DD, YYYY", locale: "ru")
              image {
                file {
                  url
                }
              }
            }
          }
        }
        allContentfulAsset {
          edges {
            node {
              file {
                url
                fileName
                contentType
              }
              contentful_id
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const postTemplate = path.resolve(`src/templates/Post/index.js`);
  const assetsMap = result.data.allContentfulAsset.edges.reduce(
    (accum, { node }) => ({
      ...accum,
      [node.contentful_id]: { ...node.file },
    }),
    {}
  );
  result.data.allContentfulPost.edges.forEach(({ node }, index, posts) => {
    const next = index > 0 ? posts[index - 1].node : null;
    const prev = index + 1 < posts.length ? posts[index + 1].node : null;

    createPage({
      path: `posts/${node.slug}`,
      component: postTemplate,
      context: {
        post: {
          ...node,
        },
        assetsMap,
        next: next ? { slug: next.slug, title: next.title } : null,
        prev: prev ? { slug: prev.slug, title: prev.title } : null,
      },
    });
  });
};
