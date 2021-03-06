import { HoroscopeBaseRouter } from "../router";
import { Request, Response } from "../../base/types";
import { DataHandler } from "../../base/data-handler";

export class RobotsRouter extends HoroscopeBaseRouter {
    constructor() {
        super('/robots.txt')
    }
    protected createHander(req: Request, res: Response) {
        const handler = new DataHandler({
            req, res,
            data: `User-agent: *
Disallow: /controls
Disallow: /actions
`,
            code: 200,
            headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
        });

        handler.setCacheControl(60 * 24);

        return handler;
    }
}

export class OneSignalSDKWorkerRouter extends HoroscopeBaseRouter {
    constructor() {
        super('/OneSignalSDKWorker.js')
    }
    protected createHander(req: Request, res: Response) {
        const handler = oneSignalHandler(req, res);

        handler.setCacheControl(60 * 24);

        return handler;
    }
}

export class OneSignalSDKUpdaterWorkerRouter extends HoroscopeBaseRouter {
    constructor() {
        super('/OneSignalSDKUpdaterWorker.js')
    }
    protected createHander(req: Request, res: Response) {
        const handler = oneSignalHandler(req, res);

        handler.setCacheControl(60 * 24);

        return handler;
    }
}

const oneSignalHandler = (req: Request, res: Response) => new DataHandler({
    req, res,
    data: `importScripts('https://cdn.onesignal.com/sdks/OneSignalSDK.js');`,
    code: 200,
    headers: { 'Content-Type': 'application/javascript; charset=UTF-8' },
});
