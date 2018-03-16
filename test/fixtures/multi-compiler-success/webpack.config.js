module.exports = [
    {
      mode: 'production',
      entry: __dirname + "/index.js",
      output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
      }
    },
    {
      mode: 'production',
      entry: __dirname + "/index2.js",
      output: {
        path: __dirname + "/dist",
        filename: "bundle2.js"
      }
    }
];
