import { IConsoler } from "src/types/Consoler";
import colors from "../colors.json";

export class Consoler {
    private options: IConsoler;
    private log: (...args: any[]) => void;

    constructor({ timestamp, variant, title = null }: IConsoler) {
        this.options = {
            timestamp,
            variant,
            title
        };


        this.log = process.stdout.write.bind(process.stdout);
        console.success = (message?: any, options?: any, ...optionalParams: any[]) => this.logger("SUCCESS", "green", message, options, ...optionalParams);
        console.error = (message?: any, options?: any, ...optionalParams: any[]) => this.logger("ERROR", "red", message, options, ...optionalParams);
        console.warn = (message?: any, options?: any, ...optionalParams: any[]) => this.logger("WARNING", "yellow", message, options, ...optionalParams);
        console.info = (message?: any, options?: any, ...optionalParams: any[]) => this.logger("INFO", "blue", message, options, ...optionalParams);
        console.loading = (time: number, message?: any, options?: any, ...optionalParams: any[]) => this.loading(time, message, options, ...optionalParams);
    }

    private getTime() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    }


    private logger = (defTitle = "SUCCESS", color: 'green' | 'red' | 'yellow' | 'blue' = "green", message?: any, options: any = {}, ...optionalParams: any[]) => {
        let msg = ``;
        let timestamp = this.options.timestamp ? true : (options.timestamp ? true : false) || false;
        let variants = ["foreground", "background"];
        let variant = this.options.variant ? this.options.variant : (options.variant ? options.variant : "foreground");
        let title = options.title ? options.title : (this.options.title ? this.options.title : defTitle);
        if (!variants.includes(variant)) variant = "foreground";

        if (variant === "background") {
            msg = ` ${colors.bg[color]}${colors.bold} {title} ${timestamp ? `${colors.reset}${colors.fg.gray} {timestamp}:` : ''}${colors.reset}${colors.fg[color]} {message}${colors.reset}`;
        } else if (variant === "foreground") {
            msg = ` ${colors.text[color]}${colors.bold}{title}${timestamp ? `${colors.reset}${colors.fg.gray} {timestamp}:` : ':'} ${colors.reset}{message}${colors.reset}`;
        }

        msg = msg.replace(/{title}/gi, title);

        if (message) msg = msg.replace(/{message}/gi, message);
        else msg = msg.replace(/{message}/gi, '');

        if (msg.includes('{timestamp}') || msg.includes("{tt}")) msg = msg.replace(/{(timestamp|tt)}/gi, this.getTime());
        if (msg.includes("{italic}") || msg.includes("{i}")) msg = msg.replace(/{(italic|i)}/gi, colors.italic);
        if (msg.includes("{bold}") || msg.includes("{b}")) msg = msg.replace(/{(bold|b)}/gi, colors.bold);
        if (msg.includes("{reset}") || msg.includes("{r}")) msg = msg.replace(/{(reset|r)}/gi, colors.reset);
        if (msg.includes("{underline}") || msg.includes("{u}")) msg = msg.replace(/{(underline|u)}/gi, colors.underline);
        if (msg.includes("{strikethrough}") || msg.includes("{s}")) msg = msg.replace(/{(strikethrough|s)}/gi, colors.strikethrough);
        if (msg.includes("{color.") || msg.includes("{c.")) {
            let color = msg.match(/{(color|c)\.(.*?)}/gi)
            // msg: This is a {c.red}red{r}{c.blue} message!{r};

            if (color) {
                let totalColors = msg.match(/{(color|c)\.(.*?)}/gi).length;
                let newMessage = msg;
                for (let i = 0; i < totalColors; i++) {
                    let c = msg.match(/{(color|c)\.(.*?)}/gi)[i];
                    // color: red
                    const cc = c.match(/{(color|c)\.(.*?)}/i)[2];

                    // @ts-ignore
                    const fg = colors.fg[cc];

                    if (fg) {
                        newMessage = newMessage.replace(c, fg);
                    } else {
                        newMessage = newMessage.replace(c, '');
                    }
                }
                msg = newMessage;
            } else {
                msg = msg.replace(/{(color|c)\.(.*?)}/gi, '');
            }
        }


        const log = this.log(msg + '\n', ...optionalParams);
    }

    private loading = (time: number, message: any, onDone: () => void, options: any = {}, ...optionalParams: any[]) => {
        let indicator = 0;
        let indicators = ['|', '/', '-', '\\'];

        let interval = setInterval(() => {
            let msg = message || `Loading {indicator}`;
            if (options.title) msg = msg.replace(/{title}/gi, options.title);
            else msg = msg.replace(/{title}/gi, "LOADING");

            if (message) msg = msg.replace(/{message}/gi, message);
            else msg = msg.replace(/{message}/gi, '');

            if (msg.includes('{timestamp}') || msg.includes("{tt}")) msg = msg.replace(/{(timestamp|tt)}/gi, this.getTime());
            if (msg.includes("{italic}") || msg.includes("{i}")) msg = msg.replace(/{(italic|i)}/gi, colors.italic);
            if (msg.includes("{bold}") || msg.includes("{b}")) msg = msg.replace(/{(bold|b)}/gi, colors.bold);
            if (msg.includes("{reset}") || msg.includes("{r}")) msg = msg.replace(/{(reset|r)}/gi, colors.reset);
            if (msg.includes("{underline}") || msg.includes("{u}")) msg = msg.replace(/{(underline|u)}/gi, colors.underline);
            if (msg.includes("{color.") || msg.includes("{c.")) {
                let color = msg.match(/{(color|c)\.(.*?)}/gi)[0].replace(/{(color|c)\.(.*?)}/gi, "$2");
                // @ts-ignore
                if (colors.fg?.[color] !== undefined) {
                    // @ts-ignore
                    msg = msg.replace(/{(color|c)\.(.*?)}/gi, colors.fg[color]);
                } else {
                    console.warn(`Color ${color} not found!`);
                    msg = msg.replace(/{(color|c)\.(.*?)}/gi, '');
                }
            }

            console.clear();
            if (msg.includes("{indicator}")) msg = msg.replace(/{indicator}/gi, indicators[indicator]);
            indicator++;
            if (indicator > 3) indicator = 0;

            this.logger("LOADING", options?.color || "yellow", msg, options, ...optionalParams);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            if (onDone) onDone();
        }, time);
    }
}

declare global {
    interface Console {
        success: (message?: any, options?: any, ...optionalParams: any[]) => void;
        // @ts-ignore
        error: (message?: any, options?: any, ...optionalParams: any[]) => void;
        // @ts-ignore
        warn: (message?: any, options?: any, ...optionalParams: any[]) => void;
        // @ts-ignore
        info: (message?: any, options?: any, ...optionalParams: any[]) => void;
        // @ts-ignore
        loading: (time: number, message?: any, onDone: () => void, options?: any, ...optionalParams: any[]) => void;
    }
}