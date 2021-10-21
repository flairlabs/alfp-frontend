import {useRouter} from 'next/router'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import {PAGE_URLS} from "../../../lib/constants";
import {Fragment, useEffect, useState} from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'


export default function MasterNavbar() {
    const router = useRouter()
    const env = process.env.NODE_ENV
    const nav_urls = PAGE_URLS[env]

    const top_navigation = [
        {
            name: 'Home', href: nav_urls.home.url, current: false, children:
                [
                    {name: 'Investing 101', href: '/page/cG9zdDo3', current: false},
                    {name: "Fund Manager's Corner", href: '#', current: false},
                    {name: 'FAQs', href: '#', current: false}
                ]
        },
        {
            name: "Mutual Funds", href: '#', current: false, children:
                [
                    {
                        name: 'Fixed Income', href: '#', current: false, children:
                            [
                                {
                                    name: 'ALFM Money Market Fund', href: nav_urls.funds.alfm_money_market_fund.url, current: false

                                },
                                {
                                    name: 'ALFM Peso Bond Fund', href: '#', current: false

                                },
                                {
                                    name: 'ALFM Dollar Bond Fund', href: '#', current: false

                                },
                                {
                                    name: 'ALFM Euro Bond Fund', href: '#', current: false

                                },
                            ]
                    },
                    {
                        name: 'Mixed Assets', href: '#', current: false, children:
                            [
                                {
                                    name: 'ALFM Global Multi-Asset Income Fund', href: '#', current: false

                                },
                            ]
                    },
                    {
                        name: 'Equity', href: '#', current: false, children: [
                            {
                                name: 'ALFM Growth Fund', href: '#', current: false

                            },
                            {
                                name: 'Philippine Stock Index Fund', href: '#', current: false

                            },
                        ]
                    }
                ]
        },
        {name: 'About ALFM', href: nav_urls.about.url, current: false, children: []},
        {name: 'Related Sites', href: '#', current: false, children: []},
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function changeParentNav(idx) {
        if(top_navigation.children !== null){
            return top_navigation[idx].children
        }
        return []
    }

    let navigation = changeParentNav(0)

    const [nav, setNav] = useState(0)

    function updateNav(){
        navigation = changeParentNav(nav)
    }

    useEffect( () => {
        updateNav()
    }, [nav])

    return (
        <Disclosure as="nav" className="bg-gray-100">
            {({open}) => (
                <>
                    <div className="bg-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex justify-items-center">
                                        {top_navigation.map((item, idx) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                onMouseOver={event => setNav(idx)}
                                                className={classNames(
                                                    router.pathname === item.href ? 'bg-accent-1 text-gray-800' : 'text-gray-600 hover:bg-accent-1',
                                                    'px-3 py-2 text-sm font-medium display-block'
                                                )}
                                                aria-current={router.pathname === item.href ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <img
                                        className="block h-8 w-auto"
                                        src="/alfm-logo.png"
                                        alt="{CMS_NAME}"
                                    />

                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {top_navigation[nav].children.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
