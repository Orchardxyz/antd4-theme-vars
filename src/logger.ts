import chalk from "chalk";

const log = console.log;

/**
 * 获取当前的时分秒
 * @returns {string} 当前时间的时分秒，格式为 "HH:mm:ss"
 */
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export type LoggerMessageType = string | string[];

function composeMessage(type: string, message: LoggerMessageType) {
  return `${type} - [${getCurrentTime()}] ${
    Array.isArray(message) ? message.join(" ") : message
  }`;
}

function info(message: LoggerMessageType) {
  log(composeMessage(chalk.blueBright("INFO"), message));
}

function warn(message: LoggerMessageType) {
  log(composeMessage(chalk.yellowBright("WARN"), message));
}

function success(message: LoggerMessageType) {
  log(composeMessage(chalk.greenBright("SUCCESS"), message));
}

function error(message: LoggerMessageType) {
  log(composeMessage(chalk.redBright("ERROR"), message));
}

const logger = {
  info,
  warn,
  success,
  error,
};

export default logger;
