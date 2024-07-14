// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")

const expoMarkdown = "expo-markdown"

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

const workspaceRoot = __dirname
const expoMarkdownPath = path.resolve(workspaceRoot, `../${expoMarkdown}`)

config.watchFolders = [path.resolve(workspaceRoot, "..")]
config.resolver.unstable_enablePackageExports = true
config.resolver.unstable_enableSymlinks = true
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  [expoMarkdown]: expoMarkdownPath
}
config.resolver.nodeModulesPaths = [
  ...config.resolver.nodeModulesPaths,
  path.resolve(workspaceRoot, "node_modules"),
  path.resolve(expoMarkdownPath, "node_modules")
]

module.exports = config
