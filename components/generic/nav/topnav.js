import Link from 'next/link'
import {useRouter} from 'next/router'
import Container from "../../container";
import {Disclosure} from "@headlessui/react";
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import {PAGE_URLS} from "../../../lib/constants";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TopNav() {
    const router = useRouter()
    const env = process.env.NODE_ENV
    const nav_urls = PAGE_URLS[env]

    const navigation = [
        {name: 'Home', href: nav_urls.home.url, current: false},
        {name: "Mutual Funds", href: nav_urls.funds.alfm_money_market_fund.url, current: false},
        {name: 'About ALFM', href: nav_urls.about.url, current: false},
        {name: 'Related Sites', href: '#', current: false},
    ]
    return (
        <Disclosure as="nav" className="bg-white">
            {({open}) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
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
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex justify-items-center">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    router.pathname === item.href ? 'bg-accent-1 text-gray-800' : 'text-gray-600 hover:bg-accent-1',
                                                    'px-3 py-2 rounded-md text-sm font-medium display-block'
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

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        router.pathname === item.href ? 'bg-accent-1 text-gray-800' : 'text-gray-600 hover:bg-accent-1',
                                        'block px-3 py-2 rounded-md text-sm font-medium display-block'
                                    )}
                                    aria-current={router.pathname === item.href ? 'page' : undefined}
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
