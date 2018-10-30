import { PortalViewModel, PortalViewModelBuilder } from "./portal-view-model";
import { NewsEvent, NewsEventStringFields } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import logger from "../../logger";

export interface ErrorViewModelInput extends OurnetViewModelInput {
    error: Error
}

export interface ErrorViewModel extends PortalViewModel {
    latestEvents: NewsEvent[]
    error: Error
}

export class ErrorViewModelBuilder extends PortalViewModelBuilder<ErrorViewModel, ErrorViewModelInput> {
    async build() {
        this.model.error = this.input.error;
        const { lang, country } = this.model;

        this.apiClient.newsEventsLatest('latestEvents', { fields: NewsEventStringFields }, { params: { lang, country, limit: 4 } });

        try {
            return await super.build();
        } catch (e) {
            logger.error(e);
            return this.model;
        }
    }
}
