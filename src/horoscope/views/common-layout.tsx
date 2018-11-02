import * as React from 'react';
import { HoroscopeViewModel } from '../view-models/horoscope-view-model';
import Layout from './layout';
import { AdAside } from './components/ads/ad-aside';
import { HoroscopeLocaleNames } from '../locale';
import { SectionHeader } from '../../views/components/section-header';
import { getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../ournet/data';
import { EventListItem } from '../../news/views/components/event-list-item';
import { getAssetUrl } from '../../assets';
import env from '../../env';

export default class CommonLayout extends React.Component<HoroscopeViewModel> {
    render() {
        const { project, children, latestNews, translate, country, links, lang, config } = this.props;
        return (
            <Layout {...this.props}>
                <div className="o-layout">
                    <div className="o-layout__item u-4/6@desktop">
                        {children}
                    </div>
                    <div className="o-layout__item u-2/6@desktop">
                        {latestNews && latestNews.length > 0 &&
                            <div className='c-section'>
                                {SectionHeader({
                                    name: translate(HoroscopeLocaleNames.latest_news),
                                    link: getSchema(OurnetProjectName.NEWS, country) + '//' + getHost(OurnetProjectName.NEWS, country) + links.news.home({ ul: lang })
                                })}
                                <div className="o-layout o-layout--small">
                                    {latestNews.map(item => <div key={item.id} className='o-layout__item u-1/2@tablet u-1/1@desktop'>{EventListItem({ lang, country, project, links, timezone: config.timezone, item, view: 'card-bare', imageSize: 'small' })}</div>)}
                                </div>
                            </div>}
                        {AdAside()}
                    </div>
                </div>
                <script async={true} src={getAssetUrl(project, 'js', 'main', env.isProduction)} />
            </Layout>
        )
    }
}