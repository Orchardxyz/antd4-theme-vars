import { Command } from "commander";
import { readFileSync } from "fs-extra";
import { join } from "path";
import chalk from "chalk";
import generate from "./generate";

const program = new Command();
const version = JSON.parse(
  readFileSync(join(__dirname, "../../package.json"), {
    encoding: "utf-8",
  }).toString()
).version;

export async function run() {
  program
    // .version(chalk.greenBright(version))
    .command("gen")
    .action(function () {
      generate();
    });

  program.parse();
}
