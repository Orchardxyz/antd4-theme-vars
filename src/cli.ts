import { Command } from "commander";
import { existsSync, readFileSync } from "fs-extra";
import { join } from "path";
import chalk from "chalk";
import generate from "./generate";
import logger from "./logger";
import { CONFIG_FILES } from "./constants";
import { DefineConfigType } from "./types";

const program = new Command();
const version = JSON.parse(
  readFileSync(join(__dirname, "../../package.json"), {
    encoding: "utf-8",
  }).toString()
).version;

logger.info(["Using", chalk.blueBright(`antd4-theme-vars@${version}`)]);

export async function run() {
  function genCommandAction(isRegenerate = false) {
    logger.info(
      isRegenerate
        ? "Regenerating theme files..."
        : "Start generating theme files..."
    );
    let configFilePath;
    let config: DefineConfigType | undefined;
    for (const configFile of CONFIG_FILES) {
      configFilePath = join(process.cwd(), configFile); // 拼接当前工作目录和配置文件名
      if (!existsSync(configFilePath)) {continue;} // 如果文件不存在，则继续遍历下一个配置文件
      config = require(configFilePath); // 返回找到的配置文件内容
    }

    // 如果遍历完所有配置文件都未找到存在的配置文件，则结束进程
    if (!config) {
      logger.error(
        "Cannot find the configuration file for `antd4-theme-vars`."
      );
      process.exit(1);
    }

    // // 监听配置文件变化
    // watch(configFilePath!, (eventType, fileName) => {
    //   if (eventType === "change") {
    //     logger.info(
    //       `${chalk.blueBright(fileName)} changed. Regenerating theme files...`
    //     );
    //     genCommandAction(true);
    //   }
    // });

    generate(config);
  }

  program.command("gen").action(() => genCommandAction());

  program.parse();
}
