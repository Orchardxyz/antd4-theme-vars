const { defineConfig } = require("antd4-theme-vars");

module.exports = defineConfig({
  themes: [
    // invalid prefixCls
    {
      prefixCls: "ant",
      fileName: "ant",
      variables: {
        "primary-color": "#1890ff",
        "link-color": "#1890ff",
        "border-radius-base": "4px",
      },
    },
    {
      prefixCls: "green",
      fileName: "green",
      variables: {
        "primary-color": "#25b864",
      },
    },
    {
      prefixCls: "orange",
      fileName: "orange",
      variables: {
        "primary-color": "#FF6F00",
      },
    },
    {
      prefixCls: "yellow",
      fileName: "yellow",
      variables: {
        "primary-color": "#FFB600",
      },
    },
    {
      prefixCls: "purple",
      fileName: "purple",
      variables: {
        "primary-color": "#722ED1",
      },
    },
  ],
});
