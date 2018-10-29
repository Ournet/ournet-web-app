
import * as React from 'react';
import { NewsBaseHandler } from "./handler";
import { INewsAppData } from "../data";
import { TopicViewModelInput, TopicViewModelBuilder } from '../view-models/topic-view-model';
import TopicPage from '../views/topic/topic-page';

export class TopicHandler extends NewsBaseHandler<TopicViewModelInput>{
    async handle(data: INewsAppData) {
        const viewData = await new TopicViewModelBuilder(this.input, data).build();
        const res = this.input.res;

        this.setCacheControl(res, 15);
        return this.render(res, <TopicPage {...viewData} />);
    }
}