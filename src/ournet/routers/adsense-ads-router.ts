import { OurnetRouter } from "../router";
import { Request, Response } from "../../base/types";
import { Handler } from "../../base/handler";
import { IOurnetAppData } from "../data";
import { OurnetViewModelInput } from "../view-model";


export class AdsenseAdsRouter extends OurnetRouter {
    constructor() {
        super('/alt-adsense-ads.html');
    }
    protected createHander(req: Request, res: Response) {
        return new AdsenseAdsHandler(this.formatInput(req, res));
    }
}

class AdsenseAdsHandler extends Handler<IOurnetAppData, OurnetViewModelInput> {
    handle() {
        const res = this.input.res;

        this.setCacheControl(res, 60 * 24 * 30);

        return this.redirect(res, 'https://assets.ournetcdn.net/backup-ads/index.html', 301);
    }
}