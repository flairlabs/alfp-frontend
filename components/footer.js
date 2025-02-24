import {CMS_NAME} from '../lib/constants'
import {top_navigation} from "./generic/nav/master-nav";
import {Fragment} from "react";

const master_nav = top_navigation.slice(0, -1)

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function hasChildren(item) {
    return item.children !== null
}

export default function Footer() {
    return (
        <div>
            <footer className="bg-accent-2">
                <div
                    className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                            <span className="text-xl text-white">CONTACT US</span>
                        </a>
                        <p className="mt-2 text-sm text-white flex">
                            <svg className="h-5 w-5 text-white mr-3" width="24" height="24" viewBox="0 0 24 24"
                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <path
                                    d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"/>
                            </svg>
                            (+632) 889-10000

                        </p>
                        <p className="mt-2 text-sm text-white flex">
                            <svg className="h-8 w-8 text-white mr-3" width="24" height="24" viewBox="0 0 24 24"
                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <line x1="3" y1="21" x2="21" y2="21"/>
                                <line x1="9" y1="8" x2="10" y2="8"/>
                                <line x1="9" y1="12" x2="10" y2="12"/>
                                <line x1="9" y1="16" x2="10" y2="16"/>
                                <line x1="14" y1="8" x2="15" y2="8"/>
                                <line x1="14" y1="12" x2="15" y2="12"/>
                                <line x1="14" y1="16" x2="15" y2="16"/>
                                <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/>
                            </svg>
                            19F BPI Buendia Center, Sen. Gil J. Puyat Ave., Makati City 1209
                        </p>
                        <p className="mt-2 text-sm text-white flex">
                            <svg className="h-5 w-5 text-white mr-3" width="24" height="24" viewBox="0 0 24 24"
                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <rect x="3" y="5" width="18" height="14" rx="2"/>
                                <polyline points="3 7 12 13 21 7"/>
                            </svg>
                            bpi_investment@bpi.com.ph
                        </p>
                    </div>
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    {master_nav.map((nav, idx) => (

                            <div key={idx} className="lg:w-1/3 md:w-1/2 w-full px-4">
                                <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">{nav.name}</h2>
                                <nav className="list-none mb-10">
                                    {nav.children.map((item, idx) => (
                                        <Fragment key={idx}>
                                            {hasChildren(item) ? (
                                                <li>
                                                    <span className='text-gray-300'>
                                                        {item.name}
                                                    </span>
                                                    <ul className='pl-3'>
                                                        {item.children.map((child) => (
                                                            <li key={child.name}>
                                                                <a
                                                                    key={child.name}
                                                                    href={child.href}
                                                                    className='text-white hover:text-accent-1'
                                                                    aria-current={item.current ? 'page' : undefined}
                                                                >
                                                                    {child.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ) : (
                                                <li>
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className='text-white hover:text-accent-1'
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </li>
                                            )}
                                        </Fragment>
                                    ))}
                                </nav>
                            </div>

                    ))}
                    </div>
                </div>
                <div className="bg-gray-700">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-white text-sm text-center sm:text-left">© 2021 ALFM Mutual Funds</p>

                        <p className="text-white text-sm mt-1 text-center sm:text-left"><strong>This is not a deposit product. Earnings are not assured and principal amount invested is exposed to risk of loss. This product cannot be sold to you unless its benefits and risks have been thoroughly explained. If you do not fully understand this product, do not purchase or invest in it.</strong></p>

                        <p className="text-gray-400 mt-1 text-sm text-center sm:text-left">A Mutual Fund is an open end investment company registered with the Securities and Exchange Commission (SEC) in which the investible cash of numerous investors are pooled in a specific fund (“Fund”) with the aim of achieving a specific objective. The Fund is NOT a DEPOSIT product and is not an obligation of, or guaranteed, or insured by the Fund Manager, and is not insured by the Philippine Deposit Insurance Corporation (PDIC). Due to the nature of the investments, yield and potential yields cannot be guaranteed. Any income or income loss arising from market fluctuations and price volatility of the securities held by the Fund, even if invested in government securities, is for the account of the investor. As such, shares of the investor in the Fund, when redeemed, may be worth more or be worth less than his/her initial participation/contribution. Historical performance, when presented, is purely for reference purposes and is not a guarantee of future results. The Fund Manager is not liable for losses, under upon willful default, evident bad faith or gross negligence. Investors are advised to read the Prospectus of the Fund which may be obtained from authorized distributors before deciding to invest.</p>

                    </div>
                </div>
            </footer>
        </div>
    )
}
