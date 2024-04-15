import { Command } from "commander";
import { readFileSync } from "fs-extra";
import { join } from "path";
import chalk from "chalk";
import generate from "./generate";
import logger from "./logger";

const program = new Command();
const version = JSON.parse(
  readFileSync(join(__dirname, "../../package.json"), {
    encoding: "utf-8",
  }).toString()
).version;

logger.info(["Using", chalk.blueBright(`antd4-theme-vars@${version}`)]);

export async function run() {
  program.command("gen").action(function () {
    logger.info("Start generating theme files...");
    generate();
  });

  program.parse();
}
