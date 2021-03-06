
import * as React from 'react';
import { getSchema, getHost } from 'ournet.links';
import { HoroscopeViewModel } from '../../view-models/horoscope-view-model';

export function PageFooter({ project, locales, lang, config, country, version }: HoroscopeViewModel) {

    return (
        <footer className='c-footer'>
            <div className='o-wrapper'>
                <div className='o-layout'>
                    <div className='o-layout__item u-1/3@tablet o-footer-info'>
                        <h4>{locales.info()}</h4>
                        <div>{locales.contact()} <a href={'mailto:' + config.email}>{config.email}</a></div>
                        <p>Version: {version}</p>
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-sites'>
                        <h4>{locales.international()}</h4>
                        {config.internationalIds.map(code => <div key={code}><a href={getSchema(project, code) + '//' + getHost(project, code)}>{locales.getCountryName(code)}</a></div>)}
                    </div>
                    <div className='o-layout__item u-1/3@tablet o-footer-useful'>
                        <h4>{locales.useful()}</h4>
                        {/* <div><a href={links.horoscope.sign('api', { ul: lang })}>{translate(HoroscopeLocaleNames.export_horoscope)}</a></div> */}
                        {config.projects.map(item => <div key={item}><a href={getSchema(item, country) + '//' + getHost(item, country)}>{locales.getProjectName(item)}</a></div>)}
                        <div>
                            <a href='https://play.google.com/store/apps/details?id=com.ournet.horoscope' target="_blank">
                                <img alt='Google Play' style={{ width: '140px' }} src={`https://play.google.com/intl/en_us/badges/images/generic/${lang}_badge_web_generic.png`} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
