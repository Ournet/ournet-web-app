
import * as React from 'react';
import { getPlaceName, toBeaufort } from '../../../../helpers';
import { Sitemap } from 'ournet.links';
import { ForecastIcon } from '../../../../views/components/weather/forecast-icon';
import { ForecastTemp } from '../../../../views/components/weather/forecast-temp';
import { PlaceDailyForecast } from '../../../view-models/places-daily-forecast-model';
import { WeatherHelpers } from '../../../helpers';

export type PlacesDailyForecastProps = {
    lang: string
    links: Sitemap
    reports: PlaceDailyForecast[]
}

export function PlacesDailyForecast({ reports, lang, links }: PlacesDailyForecastProps) {

    return (
        <div className='c-places-daily-forecast' >
            {reports.map(item => (
                <div key={item.place.id} className='dr-row'>
                    <div className='dr-r dr-r-date'>
                        <a href={links.weather.place(item.place.id, { ul: lang })}>{getPlaceName(item.place, lang)}</a>
                    </div>
                    <div className='dr-r dr-r-temp'>
                        {ForecastIcon({ lang, icon: item.forecast.icon })}
                        {ForecastTemp({ temperature: item.forecast.temperature })}
                        <span className='symbol-name'>{WeatherHelpers.iconName(item.forecast.icon, lang)}</span>
                    </div>
                    <div className='dr-r dr-r-wind'>
                        <span className={'wind-speed beaufort-' + toBeaufort(item.forecast.windSpeed || 1)}>{item.forecast.windSpeed}</span>
                        <i title={item.forecast.windDir} className={`i-wind-dir i-wind-dir--${item.forecast.windDir}`}></i>
                    </div>
                </div>
            ))}
        </div>
    )
}
