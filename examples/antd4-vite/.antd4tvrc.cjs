const { defineConfig } = require("antd4-theme-vars");

module.exports = defineConfig({
  styleType: "css",
  themes: [
    {
      prefixCls: "custom",
      fileName: "custom",
      variables: {
        "primary-color": "#25b864",
      },
    },
  ],
});
