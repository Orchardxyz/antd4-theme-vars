import {
  DEFAULT_ANTD_LESS_LOOKING_PATH,
  DEFAULT_ANTD_LESS_PATH,
  DEFAULT_ANT_PREFIX,
  DEFAULT_OUTPUT_DIR,
} from "./constants";
import { join } from "path";
import { DefineConfigType, ThemeConfig } from "./types";
import logger from "./logger";
import chalk from "chalk";
import less from "less";
import postcss, { Root } from "postcss";
import { emptyDirSync, outputFileSync, readFileSync } from "fs-extra";

export function uniqueThemeConfigs(themes: ThemeConfig[]) {
  // 使用Map来过滤掉重复的配置，以prefixCls为键
  const themesMap: Map<string, ThemeConfig> = new Map();

  // 遍历输入数组，将唯一的配置添加到Map中
  themes.forEach((config) => {
    const { prefixCls } = config;
    if (!prefixCls) {
      logger.warn(`The prefixCls \`${prefixCls}\` is invalid. Skipped.`);
      return;
    }
    if (prefixCls === DEFAULT_ANT_PREFIX) {
      logger.warn(
        `Default \`${DEFAULT_ANT_PREFIX}\` prefixCls is not allowed. Skipped.`
      );
      return;
    }
    themesMap.set(prefixCls, config);
  });

  // 将Map的值转换为数组并返回
  return Array.from(themesMap.values());
}

/**
 * 生成一个过滤 Ant Design 全局样式的 PostCSS 插件
 * @param options 配置对象，包含以下属性：
 *   - prefixCls: string，指定 Ant Design 组件的前缀Cls，用于识别和过滤相关样式
 * @returns 返回一个具有 PostCSS 插件功能的对象，该对象在处理 CSS 根节点时，会移除不包含指定前缀Cls的规则
 */
export function filterAntdGlobalStylePlugin(options: { prefixCls: string }) {
  const { prefixCls } = options;

  // 返回PostCSS插件定义的对象
  return {
    postcssPlugin: "filter-antd-global-style", // 插件名称
    Root(root: Root) {
      // 遍历CSS规则，移除不包含指定前缀Cls的规则
      root.walkRules((rule) => {
        if (
          !(
            rule.selector.startsWith(`.${prefixCls}-`) ||
            rule.selector.startsWith(`[class^=${prefixCls}-]`) ||
            rule.selector.startsWith(`[class*=${prefixCls}-]`)
          )
        ) {
          rule.remove();
        }
      });
    },
  };
}

export async function outputThemeFile(
  themeConfig: ThemeConfig,
  globalConfig: DefineConfigType
) {
  const { prefixCls, fileName, variables } = themeConfig;

  const {
    outputDir: _outputDir,
    antdLessPath: _antdLessPath,
    antdLessLookingPaths: _antdLessLookingPaths,
  } = globalConfig;

  try {
    const _replacedVars = Object.entries(variables ?? {}).reduce<
      Record<string, string>
    >((prev, [_varName, varValue]) => {
      const varName = _varName.startsWith("@") ? _varName : `@${_varName}`;
      const current = { ...prev };
      current[varName] = varValue;
      return current;
    }, {});

    const replacedVars = {
      "@theme": fileName,
      ..._replacedVars,
      "@ant-prefix": prefixCls,
    };

    const outputDir = _outputDir || join(process.cwd(), DEFAULT_OUTPUT_DIR);
    const antdLessPath =
      _antdLessPath || join(process.cwd(), DEFAULT_ANTD_LESS_PATH);
    const antdDirPaths = _antdLessLookingPaths || [
      join(process.cwd(), DEFAULT_ANTD_LESS_LOOKING_PATH),
    ];

    const targetPath = join(outputDir, `${fileName}.css`);
    const antdLessContent = readFileSync(antdLessPath, "utf-8");
    const allCssRes = await less.render(antdLessContent, {
      modifyVars: replacedVars,
      paths: antdDirPaths,
      javascriptEnabled: true,
    });

    const result = await postcss([
      filterAntdGlobalStylePlugin({ prefixCls }),
    ]).process(allCssRes.css, {
      from: undefined,
    });

    outputFileSync(targetPath, result.css);
    logger.success(
      `Generate ${chalk.blueBright.underline(targetPath)} success!`
    );
  } catch (error) {
    logger.error(error as string);
    process.exit(1);
  }
}

export default async function generate(config: DefineConfigType) {
  const { outputDir: _outputDir, themes: _themes } = config;

  if (!Array.isArray(_themes)) return;

  const outputDir = _outputDir || join(process.cwd(), DEFAULT_OUTPUT_DIR);
  const themes = uniqueThemeConfigs(_themes);
  emptyDirSync(outputDir);

  for (const themeConfig of themes) {
    await outputThemeFile(themeConfig, config);
  }
}
