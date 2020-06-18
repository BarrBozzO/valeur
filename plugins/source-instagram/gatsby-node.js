const _ = require(`lodash`);
const getPosts = require("./instagram").getPosts;
const downloadMediaFile = require("./normalize").downloadMediaFile;

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `InstagramPost`;

function processDatum(datum, createContentDigest) {
  const node = createPostNode(datum);

  // Get content digest of node. (Required field)
  const contentDigest = createContentDigest(node);

  node.internal.contentDigest = contentDigest;
  return node;
}

function createPostNode(datum) {
  return {
    type: POST_NODE_TYPE,
    username: datum.username || datum.owner.username || datum.owner.id,
    id: datum.shortcode,
    parent: `__SOURCE__`,
    internal: {
      type: POST_NODE_TYPE,
    },
    children: [],
    likes:
      _.get(datum, `edge_liked_by.count`) ||
      _.get(datum, `edge_media_preview_like.count`) ||
      datum.like_count,
    caption:
      _.get(datum, `edge_media_to_caption.edges[0].node.text`) || datum.caption,
    thumbnails: datum.thumbnail_resources,
    mediaType: datum.__typename || datum.media_type,
    preview: datum.display_url || datum.thumbnail_url || datum.media_url,
    original: datum.display_url || datum.media_url,
    timestamp:
      datum.taken_at_timestamp || new Date(datum.timestamp).getTime() / 1000,
    dimensions: datum.dimensions,
    comments:
      _.get(datum, `edge_media_to_comment.count`) || datum.comments_count,
  };
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
  store,
  cache,
}) => {
  const { createNode, touchNode } = actions;

  try {
    const originalData = await getPosts();

    originalData.forEach(async datum => {
      const res = await downloadMediaFile({
        datum: processDatum(datum, createContentDigest),
        store,
        cache,
        createNode,
        createNodeId,
        touchNode,
      });
      createNode(res);
    });
  } catch (err) {
    console.error(err);
  }

  return;
};
