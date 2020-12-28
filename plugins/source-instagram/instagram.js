const axios = require(`axios`);

exports.getPosts = async function() {
  const queryParams = {
    variables: {
      id: process.env.INSTAGRAM_QUERY_ID, // "20593822219",
      after: null,
      first: 12,
    },
    query_hash: process.env.INSTAGRAM_QUERY_HASH, // "7c8a1055f69ff97dc201e752cf6f0093",
  };

  try {
    const response = await axios.get(
      `https://www.instagram.com/graphql/query/?query_hash=${
        queryParams.query_hash
      }&variables=${JSON.stringify(queryParams.variables)}`
    );

    const { data, status } = response;

    if (status === 200) {
      const userData = data.data.user;

      if (userData) {
        return userData.edge_owner_to_timeline_media.edges.map(
          post => post.node
        );
      }
    } else {
      throw new Error("Something went wrong getting posts");
    }
  } catch (error) {
    console.log(error);
  }

  return [];
};
