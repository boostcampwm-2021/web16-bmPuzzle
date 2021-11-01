const CracoAlias = require("craco-alias");

const setting = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
};

module.exports = setting;
