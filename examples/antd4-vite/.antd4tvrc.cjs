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
    {
      prefixCls: "ant",
      fileName: "ant",
      variables: {
        "primary-color": "#1890ff",
        "link-color": "#1890ff",
        "border-radius-base": "4px",
      },
    },
  ],
});
