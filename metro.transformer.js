const upstreamTransformer = require("@expo/metro-config/babel-transformer")
const path = require("path")

module.exports.transform = async ({ src, filename, options }) => {
  const ext = path.extname(filename).toLowerCase()

  if (ext === ".md" || ext === ".txt") {
    return upstreamTransformer.transform({
      src: `module.exports = ${JSON.stringify(src)}`,
      filename,
      options,
    })
  }

  return upstreamTransformer.transform({ src, filename, options })
}
