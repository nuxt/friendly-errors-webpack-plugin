const webpack = require("webpack");
const { consola } = require("consola");
const config = require("./webpack.config");

consola.wrapConsole();

const compiler = webpack(config);

compiler.watch({}, (stats) => {

});
