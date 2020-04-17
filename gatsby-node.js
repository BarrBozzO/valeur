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
                  }
                }
              }
              title
              slug
              metaDescription
              createdAt
            }
          }
        }
        allContentfulOnlineInvitation {
          edges {
            node {
              id
              description {
                internal {
                  content
                }
              }
              title
              slug
              metaDescription
              createdAt
              image {
                file {
                  url
                }
              }
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

  const postTemplate = path.resolve(`src/templates/post.js`);
  result.data.allContentfulPost.edges.forEach(({ node }) => {
    createPage({
      path: `posts/${node.slug}`,
      component: postTemplate,
      context: {
        post: {
          ...node,
        },
      },
    });
  });

  const onlineInvitationTemplate = path.resolve(
    `src/templates/OnlineInvitation/index.js`
  );
  result.data.allContentfulOnlineInvitation.edges.forEach(
    ({ node }, index, invitations) => {
      const next = index > 0 ? invitations[index - 1].node : null;
      const prev =
        index + 1 < invitations.length ? invitations[index + 1].node : null;

      createPage({
        path: `portfolio/online-invitations/${node.slug}`,
        component: onlineInvitationTemplate,
        context: {
          invitation: {
            ...node,
          },
          next: next ? { slug: next.slug, title: next.title } : null,
          prev: prev ? { slug: prev.slug, title: prev.title } : null,
        },
      });
    }
  );
};
