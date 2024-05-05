export type ThemeConfig = {
  /** prefix classname, not allowed to be `ant` */
  prefixCls: string;

  /** output file name */
  fileName: string;

  /**
   * antd less variables
   * @see https://github.com/ant-design/ant-design/blob/4.x-stable/components/style/themes/default.less
   */
  variables: Record<string, string>;
};

export type DefineConfigType = {
  /** output directory, default is `join(process.cwd(), node_modules/antd4-theme-vars/themes)` */
  outputDir?: string;

  /** different theme configs */
  themes: ThemeConfig[];
};
