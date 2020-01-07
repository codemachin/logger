export declare class FiddlerLog {
    private static instance;
    private logger;
    private constructor();
    static getInstance(): FiddlerLog;
    setConsoleLevel(display: boolean): void;
    fiddlerLogger(level: string, error: any, stack: any): void;
}
