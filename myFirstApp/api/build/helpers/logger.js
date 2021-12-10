"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogStyle = void 0;
const moment_1 = __importDefault(require("moment"));
const morgan_1 = __importDefault(require("morgan"));
const chalk_1 = __importDefault(require("chalk"));
const environment_1 = __importDefault(require("../environments/environment"));
var LogStyle;
(function (LogStyle) {
    LogStyle[LogStyle["succes"] = 0] = "succes";
    LogStyle[LogStyle["info"] = 1] = "info";
    LogStyle[LogStyle["warning"] = 2] = "warning";
    LogStyle[LogStyle["error"] = 3] = "error";
})(LogStyle = exports.LogStyle || (exports.LogStyle = {}));
class Logger {
    constructor() {
        console.log("┌────────────────────────────────────────────┐");
        console.log("|               CONFIGURATION                |");
        console.log("└────────────────────────────────────────────┘");
        if (environment_1.default.name == "development") {
            console.log(" Environment   " + chalk_1.default.yellow(environment_1.default.name.toUpperCase()));
            console.log(" Port          " + chalk_1.default.yellow(environment_1.default.app.port));
        }
        console.log("┌────────────────────────────────────────────┐");
        console.log("|                    LOGS                    |");
        console.log("└────────────────────────────────────────────┘");
    }
    static getInstance() {
        if (!Logger.instance)
            Logger.instance = new Logger();
        return Logger.instance;
    }
    printLog(style, log) {
        let trimmedLog = log;
        if (log.length > 50)
            trimmedLog = log.substring(0, 50) + "...";
        if (environment_1.default.name !== "development")
            return console.log(this.getDate() + trimmedLog);
        if (style == LogStyle.info)
            return console.log(chalk_1.default.gray(this.getDate()) + trimmedLog);
        if (style == LogStyle.succes)
            return console.log(chalk_1.default.gray(this.getDate()) + chalk_1.default.green(trimmedLog));
        if (style == LogStyle.warning)
            return console.log(chalk_1.default.gray(this.getDate()) + chalk_1.default.yellow(trimmedLog));
        if (style == LogStyle.error)
            return console.log(chalk_1.default.gray(this.getDate()) + chalk_1.default.red(trimmedLog));
    }
    config() {
        morgan_1.default.token("urlOriginal", function getUrlToken(req) {
            return req.url;
        });
        morgan_1.default.token("statusColor", (req, res, args) => {
            var status = res.statusCode;
            var color = status >= 500
                ? 31 // red
                : status >= 400
                    ? 33 // yellow
                    : status >= 300
                        ? 36 // cyan
                        : status >= 200
                            ? 32 // green
                            : 0; // no color
            return "\x1b[" + color + "m" + status + "\x1b[0m";
        });
        morgan_1.default.token("timeColored", () => {
            var time = chalk_1.default.gray(this.getDate());
            return time;
        });
        morgan_1.default.format("custom", ":timeColored\x1b[32m:method\x1b[0m \x1b[0m:urlOriginal\x1b[0m :statusColor - :response-time ms");
    }
    getDate() {
        return "[" + (0, moment_1.default)().format("DD/MM/YYYY-HH:mm:ss") + "] ";
    }
}
exports.Logger = Logger;
