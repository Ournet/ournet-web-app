
import * as React from 'react';
import { HoroscopeViewModel } from '../../view-models/horoscope-view-model';
import { HeaderPlaceForecast } from '../../../views/components/weather/header-place-forecast';
import { HoroscopeLocaleNames } from '../../locale';
import { HeaderLogo } from '../../../views/components/header-logo';
import { getSchema, getHost } from 'ournet.links';
import { OurnetProjectName } from '../../../ournet/data';

export function PageHeader({ capital, capitalForecast, links, translate, lang, country }: HoroscopeViewModel) {

    const placeForecast = capital && capitalForecast
        ? (HeaderPlaceForecast({ links, lang, country, place: capital, forecast: capitalForecast }))
        : null;


    const menuitems = [
        {
            name: translate(HoroscopeLocaleNames.horoscope),
            link: getSchema(OurnetProjectName.HOROSCOPE, country) + '//' + getHost(OurnetProjectName.HOROSCOPE, country) + links.horoscope.home({ ul: lang }),
            cssClass: 'c-menu--selected'
        },
        {
            name: translate(HoroscopeLocaleNames.news),
            link: getSchema(OurnetProjectName.NEWS, country) + '//' + getHost(OurnetProjectName.NEWS, country) + links.news.home({ ul: lang }),
        }, {
            name: translate(HoroscopeLocaleNames.weather),
            link: getSchema(OurnetProjectName.WEATHER, country) + '//' + getHost(OurnetProjectName.WEATHER, country) + links.weather.home({ ul: lang }),
        },
    ];

    return (
        <header className='c-header o-layout o-layout--small'>
            <div className='o-layout__item u-2/6 u-1/6@tablet'>
                {HeaderLogo({ url: links.portal.home({ ul: lang }), title: translate(HoroscopeLocaleNames.app_name) })}
            </div>
            <div className='o-layout__item u-4/6 u-3/6@tablet'>
                <ul className='c-menu'>
                    {menuitems.map((item, i) => <li key={i}><a className={item.cssClass} href={item.link}>{item.name}</a></li>)}
                </ul>
            </div>
            <div className='o-layout__item u-2/6@tablet u-hide-mobile u-tr'>
                {placeForecast}
            </div>
        </header>
    )
}
