import { DEFAULT_ANT_PREFIX, DEFAULT_OUTPUT_DIR } from "./constants";
import { join } from "path";
import { DefineConfigType, ThemeConfig } from "./types";
import spawn from "cross-spawn";
import logger from "./logger";
import chalk from "chalk";

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

  const child = spawn.sync(
    "lessc",
    ["--js", ...modifyVars, defaultLessPath, targetPath],
    {
      stdio: "inherit",
    }
  );
  if (child.error) {
    logger.error(child.stderr.toString());
    process.exit(1);
  } else {
    logger.success(
      `Generate ${chalk.blueBright.underline(targetPath)} success!`
    );
  }
}

export default async function generate(config: DefineConfigType) {
  const { outputDir: _outputDir, themes: _themes } = config;

  const outputDir = _outputDir || DEFAULT_OUTPUT_DIR;

  if (!Array.isArray(_themes)) return;

  const themes = uniqueThemeConfigs(_themes);

  for (const config of themes) {
    await outputThemeFile(config, outputDir);
  }
}
