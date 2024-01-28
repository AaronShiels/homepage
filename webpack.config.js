import { dirname, resolve as resolvePath } from "path";
import { fileURLToPath } from "url";
import ResolveTypeScriptPlugin from "resolve-typescript-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

const config = (_, { mode }) => {
  if (!mode) throw new Error("Mode not provided");

  const debugBuild = mode !== "production";
  const src = "./src";
  const dist = "./dist";

  var absRoot = dirname(fileURLToPath(import.meta.url));
  const entry = `${src}/index.tsx`;

  const devtool = debugBuild ? "source-map" : false;

  const tsLoaderRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [{ loader: "ts-loader", options: { transpileOnly: !debugBuild } }]
  };
  const cssLoaderRule = {
    test: /\.s[ac]ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: "css-loader", options: { sourceMap: debugBuild } },
      { loader: "sass-loader", options: { sourceMap: debugBuild } }
    ]
  };
  const module = { rules: [tsLoaderRule, cssLoaderRule] };

  const resolveTypeScriptPlugin = new ResolveTypeScriptPlugin();
  const resolve = {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [resolveTypeScriptPlugin]
  };

  const output = {
    filename: "app.[contenthash].js",
    path: resolvePath(absRoot, dist),
    publicPath: "/",
    clean: true
  };

  const htmlPluginConfig = new HtmlWebpackPlugin({ template: "./src/index.html" });
  const miniCssExtractPlugin = new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" });
  // const copyPlugin = new CopyPlugin({ patterns: [{ from: "assets/*/*", context: "./src" }] });
  const plugins = [htmlPluginConfig, miniCssExtractPlugin /*, copyPlugin*/];

  return {
    entry,
    mode,
    devtool,
    resolve,
    module,
    output,
    plugins
  };
};

export default config;
