import * as React from 'react';
import { WeatherViewModel } from '../view-models/weather-view-model';
import Layout from './layout';
import { getAssetUrl } from '../../assets';
import env from '../../env';
import { AdAside } from './components/ads/ad-aside';
import { ExploreMenu } from './components/explore-menu';
import { getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../ournet/data';
import { EventListItem } from '../../news/views/components/event-list-item';
import { SectionHeader } from '../../views/components/section-header';
import { HoroscopeSvg } from '../../views/components/horoscope/horoscope-svg';
import { GroupHeader } from '../../views/components/group-header';
import { HoroscopeSignsLine } from '../../views/components/horoscope/horoscope-signs-line';

export default class CommonLayout extends React.Component<WeatherViewModel> {
    render() {
        const { project, children, lang, country, mainPlaces, config, locales, links, latestNews, containsProject } = this.props;
        return (
            <Layout {...this.props}>
                {containsProject(OurnetProjectName.HOROSCOPE) && HoroscopeSvg()}
                <div className="o-layout">
                    <div className="o-layout__item u-1/5 u-hide-mobile u-1/6@desktop">
                        {ExploreMenu({ lang, country, links, locales, config, places: mainPlaces })}
                    </div>
                    <div className="o-layout__item u-4/5@tablet u-3/6@desktop">
                        {children}
                        {
                            containsProject(OurnetProjectName.HOROSCOPE) &&
                            <div className='c-group'>
                                {GroupHeader({ name: locales.horoscope(), link: getSchema(OurnetProjectName.HOROSCOPE, country) + '//' + getHost(OurnetProjectName.HOROSCOPE, country) + links.horoscope.home({ ul: lang }) })}
                                {HoroscopeSignsLine({ lang, links, project, country })}
                            </div>
                        }
                    </div>
                    <div className="o-layout__item u-2/6@desktop">
                        {!config.disabledAds && AdAside()}
                        {latestNews && latestNews.length > 0 &&
                            <div className='c-section'>
                                {SectionHeader({ name: locales.latest_news(), link: getSchema(OurnetProjectName.NEWS, country) + '//' + getHost(OurnetProjectName.NEWS, country) + links.news.home({ ul: lang }) })}
                                <div className="o-layout o-layout--small">
                                    {latestNews.map(item => <div key={item.id} className='o-layout__item u-1/2@tablet u-1/1@desktop'>{EventListItem({ lang, country, project, links, timezone: config.timezone, item, view: 'card-bare', imageSize: 'small' })}</div>)}
                                </div>
                            </div>}
                    </div>
                </div>
                <script async={true} src={getAssetUrl(project, 'js', 'main', env.isProduction)} />
            </Layout>
        )
    }
}
