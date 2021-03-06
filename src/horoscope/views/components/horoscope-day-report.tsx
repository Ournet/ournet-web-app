
import * as React from 'react';
import { HoroscopeReport } from '@ournet/api-client';
import { HoroscopesHelper, HoroscopeSign } from '@ournet/horoscopes-domain';
import { Sitemap } from 'ournet.links';
import { formatSignDates, encodeReportText } from '../../helpers';
import { OurnetLocales } from '../../../locales';


export type HoroscopeDayReportProps = {
    lang: string
    links: Sitemap
    locales: OurnetLocales
    report: HoroscopeReport
    date?: string
    footer?: boolean
}

export function HoroscopeDayReport({ date, report, locales, lang, links, footer }: HoroscopeDayReportProps) {

    const sign = HoroscopesHelper.getSignName(report.sign as HoroscopeSign, lang);

    if (!sign) {
        return null;
    }

    return (
        <div className='c-report'>
            {date ? <div className='c-report__date'>{date}</div> : null}
            <div className='c-report__head u-clearfix'>
                <a className='c-report__sign' href={links.horoscope.sign(sign.slug, { ul: lang })}>
                    <div className='c-zs-icon'>
                        <svg viewBox='0 0 20 20'>
                            <use href={"#svg-zs-icon-" + report.sign}></use>
                        </svg>
                    </div>
                    <h4>{sign.name}</h4>
                    <div className='c-report__dates'>{formatSignDates(report.sign, locales.horo_sign_date_format(), lang)}</div>
                </a>
                <div className='c-report__stats'>
                    {Object.keys(report.stats).map(key => {
                        const percent = (report.stats as any)[key];
                        const circ = Math.round(2 * Math.PI * 40);
                        const len = Math.round((circ / 100) * percent);
                        return (
                            <div key={key} className={'c-stat-it' + ' v-' + key}>
                                <svg viewBox='0 0 100 100'>
                                    <circle className='c-stat-it__back' r="40" cx="50" cy="50" />
                                    <circle className='c-stat-it__line' r="40" cx="50" cy="50" strokeDasharray={`${len} ${circ}`} />
                                    <text x="50%" y="55%">{percent}</text>
                                </svg>
                                {locales.getHoroStatItemName(key as any)}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='c-report__body'>
                <div className='c-report__text' dangerouslySetInnerHTML={{ __html: encodeReportText(report.text) }}></div>
                {footer && <div className='c-report__footer'><div className='c-report__numbers'><label>{locales.lucky_numbers()}: </label>{report.numbers.map((no, i) => <span key={i}>{no}</span>)}</div></div>}
            </div>
        </div >
    )
}
