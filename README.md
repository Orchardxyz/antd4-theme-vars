# antd4-theme-vars

[![NPM version](https://img.shields.io/npm/v/antd4-theme-vars.svg?style=flat)](https://npmjs.org/package/antd4-theme-vars)
[![NPM downloads](http://img.shields.io/npm/dm/antd4-theme-vars.svg?style=flat)](https://npmjs.org/package/antd4-theme-vars)

## What

`antd-theme-vars` helps you generate static theme css files based on the `prefixCls` config of `ConfigProvider`.  

With this, you can easily customize the themes of various antd components on the page.

## Install

```bash
$ npm install antd4-theme-vars --save-dev
# or
$ yarn add antd4-theme-vars --dev
# or
$ pnpm add antd4-theme-vars --save-dev
```

## Usage

Use `.antd4tvrc.cjs` file to configure the theme variables.  

An example:

```js
const { defineConfig } = require("antd4-theme-vars");

module.exports = defineConfig({
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
```

In your entry component(such as `App.tsx`). Add:

``` diff
+ import { ConfigProvider } from "antd";
```

Use `ConfigProvider` in your component that needs to set `custom` theme:

```tsx
import { ConfigProvider } from "antd";

export default () => {
    <ConfigProvider prefixCls="custom">
      {/* do something... */}
    </ConfigProvider>
}
```

## Configuration

| Name      | Type                           | Default                                | Description                              |
| --------- | ------------------------------ | -------------------------------------- | ---------------------------------------- |
| outputDir | string                         | `node_modules/antd4-theme-vars/themes` | Output directory for generated css files |
| themes    | [ThemeConfig](#themeconfig) [] | -                                      | Theme configs                            |

### ThemeConfig

| Name      | Type   | Default | Description                                                                                                                            |
| --------- | ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| prefixCls | string | -       | not allowed to be `ant`                                                                                                                |
| fileName  | string | -       | output file name                                                                                                                       |
| variables | object | -       | antd less variables, see [default.less](https://github.com/ant-design/ant-design/blob/4.x-stable/components/style/themes/default.less) |

## LICENSE

MIT
