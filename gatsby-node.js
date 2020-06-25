const path = require("path");
const testimonials = require("./src/constants/testimonials");

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
              createdAt(formatString: "MMMM DD, YYYY", locale: "ru")
              image {
                file {
                  url
                }
              }
            }
          }
        }
        allContentfulInvitationKit {
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
              createdAt(formatString: "MMMM DD, YYYY", locale: "ru")
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
        slug: node.slug,
        assetsMap,
        next: next ? { slug: next.slug, title: next.title } : null,
        prev: prev ? { slug: prev.slug, title: prev.title } : null,
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
        path: `portfolio/savethedate-kits/${node.slug}`,
        component: onlineInvitationTemplate,
        context: {
          invitation: {
            ...node,
          },
          slug: node.slug,
          next: next ? { slug: next.slug, title: next.title } : null,
          prev: prev ? { slug: prev.slug, title: prev.title } : null,
        },
      });
    }
  );

  const invitationKitTemplate = path.resolve(
    "src/templates/InvitationKit/index.js"
  );
  result.data.allContentfulInvitationKit.edges.forEach(
    ({ node }, index, kits) => {
      const next = index > 0 ? kits[index - 1].node : null;
      const prev = index + 1 < kits.length ? kits[index + 1].node : null;

      createPage({
        path: `portfolio/invitation-kits/${node.slug}`,
        component: invitationKitTemplate,
        context: {
          kit: {
            ...node,
          },
          slug: node.slug,
          next: next ? { slug: next.slug, title: next.title } : null,
          prev: prev ? { slug: prev.slug, title: prev.title } : null,
        },
      });
    }
  );
};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  const TESTIMONIAL_NODE_TYPE = "testimonial";

  testimonials.forEach(testimonial => {
    const nodeContent = JSON.stringify(testimonial);
    const nodeMeta = {
      id: createNodeId("testimonial"),
      parent: null,
      children: [],
      internal: {
        type: TESTIMONIAL_NODE_TYPE,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(testimonial),
      },
    };
    const node = Object.assign({}, testimonial, nodeMeta);

    createNode(node);
  });
};
