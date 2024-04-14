import { existsSync } from "fs-extra";
import {
  CONFIG_FILES,
  DEFAULT_ANT_PREFIX,
  DEFAULT_OUTPUT_DIR,
} from "./constants";
import { join } from "path";
import { DefineConfigType, ThemeConfig } from "./types";
import chalk from "chalk";
import spawn from "cross-spawn";

/**
 * 获取配置文件的内容。
 * 该函数会遍历预定义的配置文件列表，查找当前工作目录下的第一个存在配置文件，并返回其内容。
 * 如果没有找到配置文件，则抛出错误。
 *
 * @returns {DefineConfigType} 返回配置文件的内容。
 * @throws {Error} 如果找不到配置文件，则抛出错误。
 */
export function getConfig(): DefineConfigType {
  // 遍历预定义的配置文件列表
  for (const configFile of CONFIG_FILES) {
    const filePath = join(process.cwd(), configFile); // 拼接当前工作目录和配置文件名
    if (!existsSync(filePath)) continue; // 如果文件不存在，则继续遍历下一个配置文件
    return require(filePath); // 返回找到的配置文件内容
  }

  // 如果遍历完所有配置文件都未找到存在的配置文件，则抛出错误
  throw new Error("Cannot find the configuration file for `antd4-theme-vars`.");
}

export function uniqueThemeConfigs(themes: ThemeConfig[]) {
  // 使用Map来过滤掉重复的配置，以prefixCls为键
  const themesMap: Map<string, ThemeConfig> = new Map();

  // 遍历输入数组，将唯一的配置添加到Map中
  themes.forEach((config) => {
    const { prefixCls } = config;
    if (!prefixCls) {
      console.log(chalk.yellowBright(prefixCls + "is an invalid prefixCls."));
      return;
    }
    if (prefixCls === DEFAULT_ANT_PREFIX) {
      console.log(chalk.yellowBright("Skip the `ant` prefixCls."));
      return;
    }
    themesMap.set(prefixCls, config);
  });

  // 将Map的值转换为数组并返回
  return Array.from(themesMap.values());
}

export async function outputThemeFile(config: ThemeConfig, targetDir: string) {
  const { prefixCls, fileName, variables } = config;

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
  const targetPath = join(process.cwd(), `${targetDir}/${fileName}.css`);

  const modifyVars = Object.entries(replacedVars).map(
    ([varName, varValue]) => `--modify-var=${varName}=${varValue}`
  );
  const defaultLessPath = join(
    process.cwd(),
    "node_modules/antd/dist/antd.less"
  );
  spawn.sync("lessc", ["--js", ...modifyVars, defaultLessPath, targetPath], {
    stdio: "inherit",
  });
}

export default async function generate() {
  const config = getConfig();
  const { outputDir: _outputDir, themes: _themes } = config;

  const outputDir = _outputDir || DEFAULT_OUTPUT_DIR;

  // TODO: message
  if (!Array.isArray(_themes)) return;

  const themes = uniqueThemeConfigs(_themes);

  for (const config of themes) {
    await outputThemeFile(config, outputDir);
  }
}
