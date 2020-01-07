"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = require("electron-log");
var fs = require("fs");
var FiddlerLog = /** @class */ (function () {
    function FiddlerLog() {
        var dir = process.env.HOME + '/logs';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        ;
        this.logger = Logger;
        this.logger.transports.file.format = '{h}:{i}:{s}:{ms} {text}';
        // Set maximum log size in bytes. When it exceeds, old log will be saved
        // as log.old.log file
        this.logger.transports.file.maxSize = 5 * 1024 * 1024;
        this.logger.transports.console.level = true;
    }
    FiddlerLog.getInstance = function () {
        if (!FiddlerLog.instance) {
            FiddlerLog.instance = new FiddlerLog();
        }
        return FiddlerLog.instance;
    };
    FiddlerLog.prototype.setConsoleLevel = function (display) {
        this.logger.transports.console.level = display;
    };
    FiddlerLog.prototype.fiddlerLogger = function (level, error, stack) {
        process.env.DEBUGLEVEL = "info";
        var setLevel = process.env.DEBUGLEVEL;
        var helperObject = {
            silly: ["silly", "debug", "verbose", "info", "warn", "error"],
            debug: ["debug", "verbose", "info", "warn", "error"],
            verbose: ["verbose", "info", "warn", "error"],
            info: ["info", "warn", "error"],
            warn: ["warn", "error"],
            error: ["error"]
        };
        var debugLevel;
        switch (level) {
            case "error":
                debugLevel = 'error';
                break;
            case "warn":
                debugLevel = 'warn';
                break;
            case "info":
                debugLevel = 'info';
                break;
            case "verbose":
                debugLevel = 'verbose';
                break;
            case "debug":
                debugLevel = 'debug';
                break;
            case "silly":
                debugLevel = 'silly';
                break;
            default:
                debugLevel = 'silly';
                break;
        }
        this.logger.transports.file.level = debugLevel;
        this.logger.transports.file.file = process.env.HOME + ("/logs/" + debugLevel + ".log");
        this.logger.transports.file.stream = fs.createWriteStream(process.env.HOME + ("/logs/" + debugLevel + ".log"), { flags: 'a' });
        var fn = this.logger[debugLevel];
        if (helperObject[setLevel].includes(debugLevel)) {
            fn("new", error, stack);
        }
        else {
            console.log("Cannot log : debug level " + setLevel + " but trying to log " + debugLevel);
        }
    };
    return FiddlerLog;
}());
exports.FiddlerLog = FiddlerLog;
