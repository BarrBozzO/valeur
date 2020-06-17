const getPosts = require("./instagram").getPosts;

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `InstagramPost`;

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions;

  try {
    const postsData = await getPosts();

    postsData.forEach(id => {
      createNode({
        id: createNodeId(id),
        parent: null,
        children: [],
        internal: {
          type: POST_NODE_TYPE,
          content: JSON.stringify(id),
          contentDigest: createContentDigest(id),
        },
      });
    });
  } catch (err) {
    console.error(err);
  }

  return;
};
