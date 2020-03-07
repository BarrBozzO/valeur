const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

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
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const postTemplate = path.resolve(`src/templates/post.js`)
  result.data.allContentfulPost.edges.forEach(({ node }) => {
    createPage({
      path: `posts/${node.slug}`,
      component: postTemplate,
      context: {
        post: {
          ...node,
        },
      },
    })
  })
}
