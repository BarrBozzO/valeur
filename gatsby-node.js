const path = require("path")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~styles": path.resolve(__dirname, "src/styles"),
      },
    },
  })
}
