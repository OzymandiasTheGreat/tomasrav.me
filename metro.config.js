const { getDefaultConfig } = require("expo/metro-config")

/**
 * @type {import("expo/metro-config").MetroConfig}
 */
const config = getDefaultConfig(__dirname)

const assetExts = [
  ...config.resolver.assetExts.filter((ext) => ext !== "md" && ext !== "txt"),
  "svg",
]
const sourceExts = [...config.resolver.sourceExts, "md", "txt"]

module.exports = {
  ...config,
  transformer: {
    ...config.transformer,
    babelTransformerPath: require.resolve("./metro.transformer.js"),
  },
  resolver: {
    ...config.resolver,
    assetExts,
    sourceExts,
  },
}
