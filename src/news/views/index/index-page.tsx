
import * as React from 'react';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';
import { EventListItem } from '../components/event-list-item';
import { HoroscopeCard } from '../../../views/components/horoscope/horoscope-card';
import { QuoteListItem } from '../components/quote-list-item';
import { GroupHeader } from '../../../views/components/group-header';
import PageContentSection from '../../../views/components/page-content-section';

export default class IndexPage extends React.Component<IndexViewModel> {
    render() {
        const { lang, head, locales, links, latestEvents, country, latestQuotes, config } = this.props;

        head.elements.push(<link key='events-rss' rel="alternate" type="application/rss+xml" title={locales.events()} href={links.news.rss.stories({ ul: lang })}></link>);
        head.elements.push(<link key='imortant-rss' rel="alternate" type="application/rss+xml" title={locales.important_news()} href={links.news.rss.stories.important({ ul: lang })}></link>);

        return (
            <CommonLayout {...this.props}>
                <main>
                    <PageContentSection>
                        <div className='o-layout'>
                            {latestEvents.slice(0, 4).map(item => <div key={item.id} className='o-layout__item u-1/4@tablet u-1/2@mobile'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card' })}</div>)}
                        </div>
                        <div className='o-layout'>
                            <div className='o-layout__item u-1/4@tablet u-1/2@mobile'>
                                {links.horoscope && HoroscopeCard({ links, lang, country, title: locales.horoscope() })}
                            </div>
                            {latestEvents.slice(4, 7).map(item => <div key={item.id} className='o-layout__item u-1/4@tablet u-1/2@mobile'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card' })}</div>)}
                        </div>
                        <div className='c-group'>
                            {GroupHeader({ name: locales.latest_quotes(), link: links.news.quotes({ ul: lang }), type: 'important' })}
                            <div className='o-layout'>
                                {latestQuotes && latestQuotes.map(item => <div key={item.id} className='o-layout__item u-1/3@tablet'>{QuoteListItem({ lang, country, links, timezone: config.timezone, view: 'card', item })}</div>)}
                            </div>
                        </div>
                        <div className='o-layout'>
                            {latestEvents.slice(7).map(item => <div key={item.id} className='o-layout__item u-1/2@mobile u-1/4@tablet'>{EventListItem({ lang, country, item, links, timezone: config.timezone, view: 'card' })}</div>)}
                        </div>
                    </PageContentSection>
                </main>
            </CommonLayout>
        )
    }
}
