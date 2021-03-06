
import * as React from 'react';
import CommonLayout from '../common-layout';
import { EventListItem } from '../components/event-list-item';
import { QuoteListItem } from '../components/quote-list-item';
import { GroupHeader } from '../../../views/components/group-header';
import { ImportantViewModel } from '../../view-models/important-view-model';
import { PageTitle } from '../../../views/components/page-title';
import { AdCenter } from '../components/ads/ad-center';
import PageContentSection from '../../../views/components/page-content-section';

export default class ImportantPage extends React.Component<ImportantViewModel> {
    render() {
        const { lang, head, locales, links, importantEvents, latestQuotes, title, subTitle, config, country } = this.props;

        head.elements.push(<link key='important-rss' rel="alternate" type="application/rss+xml" title={locales.important_news()} href={links.news.rss.stories.important({ ul: lang })}></link>);

        const list1 = importantEvents.slice(0, importantEvents.length / 2);
        const list2 = importantEvents.slice(importantEvents.length / 2);

        return (
            <CommonLayout {...this.props}>
                <PageContentSection>
                    <main>
                        {PageTitle({ title: (title || head.title), subTitle: (subTitle || head.description) })}

                        <div className='o-layout'>
                            {list1.map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/3@desktop'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card', imageSize: 'large' })}</div>)}
                        </div>
                        {AdCenter()}
                        <div className='o-layout'>
                            {list2.map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/3@desktop'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card', imageSize: 'large' })}</div>)}
                        </div>

                        <div className='c-group'>
                            {GroupHeader({ name: locales.latest_quotes(), link: links.news.quotes({ ul: lang }), type: 'important' })}
                            <div className='o-layout'>
                                {latestQuotes && latestQuotes.map(item => <div key={item.id} className='o-layout__item u-1/3@tablet'>{QuoteListItem({ country, lang, links, timezone: config.timezone, item, view: 'card' })}</div>)}
                            </div>
                        </div>
                    </main>
                </PageContentSection>
            </CommonLayout >
        )
    }
}
