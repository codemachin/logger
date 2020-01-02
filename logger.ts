import * as Logger from'electron-log';
import * as fs from 'fs'

interface objLayout {
    silly: string[];
    debug: string[];
    verbose: string[];
    info: string[];
    warn: string[];
    error: string[];
}

export class FiddlerLog{

    private static instance: FiddlerLog;
    private logger:any;

    private constructor(){

        let dir = process.env.HOME + '/logs';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        };
        this.logger = Logger;

        this.logger.transports.file.format = '{h}:{i}:{s}:{ms} {text}';   
        // Set maximum log size in bytes. When it exceeds, old log will be saved
        // as log.old.log file
        this.logger.transports.file.maxSize = 5 * 1024 * 1024;
        this.logger.transports.console.level = true;

    }

    public static getInstance(): FiddlerLog {
        if (!FiddlerLog.instance) {
            FiddlerLog.instance = new FiddlerLog();
        }

        return FiddlerLog.instance;
    }

    public setConsoleLevel(display:boolean){
        this.logger.transports.console.level = display;
    }

    public fiddlerLogger(level:string, error:any, stack:any){

        process.env.DEBUGLEVEL = "info"
        let setLevel = process.env.DEBUGLEVEL

        let helperObject: objLayout = {
            silly: ["silly", "debug", "verbose", "info", "warn", "error"],
            debug: ["debug", "verbose", "info", "warn", "error"],
            verbose: ["verbose", "info", "warn", "error"],
            info: ["info", "warn", "error"],
            warn: ["warn", "error"],
            error: ["error"]
        }

        let debugLevel:string
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
        this.logger.transports.file.file = process.env.HOME + `/logs/${debugLevel}.log`;
        this.logger.transports.file.stream = fs.createWriteStream(process.env.HOME + `/logs/${debugLevel}.log`,{ flags: 'a' });
        let fn = this.logger[debugLevel]
        if(helperObject[setLevel].includes(debugLevel)){
            fn("new",error,stack)
        }else{
            console.log(`Cannot log : debug level ${setLevel} but trying to log ${debugLevel}`)
        }
    }
}