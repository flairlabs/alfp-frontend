import {useRouter} from 'next/router'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import {CMS_NAME, PAGE_URLS} from "../../../lib/constants";
import {Fragment, useContext, useEffect, useState} from 'react'
import {ChevronDownIcon} from '@heroicons/react/solid'
import GlobalContext from "../../../lib/global-context";
const env = process.env.NODE_ENV
const nav_urls = PAGE_URLS[env]
export const top_navigation = [
    {
        name: 'Home', href: nav_urls.home.url, current: false, slug: 0, children:
            [
                {name: 'Investing 101', href: "/page/investment-basics", current: false, children: null},
                {name: "Fund Manager's Corner", href: '/page/fund-managers-corner', current: false, children: null},
                {name: 'FAQs', href: '/faqs', current: false, children: null},
                {name: 'Downloadable Files', href: '/file-library', current: false, children: null},
                {name: 'Announcements', href: '/posts/archive', current: false, children: null}
            ]
    },
    {
        name: "Mutual Funds", href: '#', current: false, slug: 1, children:
            [
                {
                    name: 'Fixed Income', href: '#', current: false, children:
                        [
                            {
                                name: 'ALFM Money Market Fund',
                                href: '/funds/alfm-money-market-fund',
                                current: false

                            },
                            {
                                name: 'ALFM Peso Bond Fund', href: '/funds/alfm-peso-bond-fund', current: false

                            },
                            {
                                name: 'ALFM Dollar Bond Fund', href: '/funds/alfm-dollar-bond-fund', current: false

                            },
                            {
                                name: 'ALFM Euro Bond Fund', href: '/funds/alfm-euro-bond-fund', current: false

                            },
                        ]
                },
                {
                    name: 'Mixed Assets', href: '#', current: false, children:
                        [
                            {
                                name: 'ALFM Global Multi-Asset Income Fund', href: '/funds/alfm-global-muti-asset-income-fund', current: false

                            },
                        ]
                },
                {
                    name: 'Equity', href: '#', current: false, children: [
                        {
                            name: 'ALFM Growth Fund', href: '/funds/alfm-growth-fund', current: false

                        },
                        {
                            name: 'Philippine Stock Index Fund', href: '/funds/philippine-stock-index-fund', current: false

                        },
                    ]
                }
            ]
    },
    {
        name: 'About ALFM', href: '#', current: false, slug: 2, children: [
            {name: 'Board of Directors', href: "/about/board-of-directors", current: false, children: null},
            {name: "Fund Manager", href: '/about/fund-manager', current: false, children: null},
            {name: 'Distributors', href: '/about/distributors', current: false, children: null}
        ]
    },
    {name: 'Related Sites', href: '/related-sites', current: false, slug: 3, children: []},
]

export default function MasterNavbar({theme}) {
    const router = useRouter()
    const global = useContext(GlobalContext)

    let topLinkNormal = "text-gray-600 hover:bg-accent-1"
    let topLinkHover = "bg-accent-1 text-gray-800"

    if(theme === "350c"){
        topLinkNormal = "text-gray-600 hover:text-white hover:bg-accent-2"
        topLinkHover = "bg-accent-2 text-white"
    }



    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function hasChildren(item) {
        return item.children !== null
    }

    function changeParentNav(idx) {
        if (top_navigation.children !== null) {
            return top_navigation[idx].children
        }
        return []
    }

    let navigation = changeParentNav(global.currentSection)

    const [nav, setNav] = useState(global.currentSection)

    function updateNav() {
        navigation = changeParentNav(nav)
    }

    useEffect(() => {
        updateNav()
    }, [nav])

    return (
        <Disclosure as="nav" className="bg-gray-100 sticky top-0 z-[9999] overflow-auto">
            {({open}) => (
                <>
                    <div className="bg-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex justify-items-center" id="navWrapperMain">

                                        {top_navigation.map((item, idx) => (
                                            <a
                                                key={"topNav-" + item.name}
                                                href={item.href}
                                                onMouseOver={event => setNav(idx)}
                                                className={classNames(
                                                    global.currentSection === item.slug ? topLinkHover : topLinkNormal,
                                                    'px-3 py-2 font-medium display-block'
                                                )}
                                                aria-current={global.currentSection === item.slug ? 'page' : undefined}
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
                            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-end justify-start sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-end">
                                    <a href="/">
                                    <img
                                        className="block h-8 w-auto"
                                        src="/images/logo.png"
                                        alt={CMS_NAME}
                                    />
                                    </a>

                                </div>
                                <div className="hidden sm:block sm:ml-12">
                                    <div className="flex space-x-4">
                                        {top_navigation[nav].children.map((item) => (
                                            <div key={"navWrapperSub-" + item.name} id="navWrapperSub">
                                                {hasChildren(item) ? (
                                                    <Menu as="div" className="relative inline-block text-left" key={"menuItem-" + item.slug}>
                                                        <div key={"divItem-" + item.slug}>
                                                            <Menu.Button
                                                                key={"menuItemButtom-" + item.name}
                                                                aria-current={item.current ? 'page' : undefined}
                                                                className="inline-flex justify-center w-full px-3 font-medium">
                                                                {item.name}
                                                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5"
                                                                                 aria-hidden="true"/>
                                                            </Menu.Button>
                                                        </div>

                                                        <Transition
                                                            key={"transition-" + item.slug}
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items
                                                                className="origin-top-right absolute right-0 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                                style={{zIndex: 999}} key={"menuItems-" + item.slug}>
                                                                <div className="py-1" key={"divMenuItems-" + item.slug}>
                                                                    {item.children.map((child) => (
                                                                        <Menu.Item key={"menuItemChild-" + child.name}>
                                                                            {({active}) => (
                                                                                <a
                                                                                    key={"menuItemChildLink-" + child.name}
                                                                                    href={child.href}
                                                                                    className={classNames(
                                                                                        active ? topLinkHover : topLinkNormal,
                                                                                        'block px-4 py-2 text-sm'
                                                                                    )}
                                                                                >
                                                                                    {child.name}
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>
                                                                    ))}


                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                ) : (
                                                    <a
                                                        key={"linkItem-" + item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current ? topLinkHover : topLinkNormal,
                                                            'px-3 py-2 font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                )}

                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1" id="navWrapperMobileMain">
                            {top_navigation.map((item, idx) => (
                                <span key={"span-" + item.name}>
                                    <a
                                        key={"mobileDisclosureItem-" + item.name}
                                        href={item.href}
                                        className={classNames(
                                            global.currentSection === item.slug ? topLinkHover : topLinkNormal,
                                            'block px-3 py-2 font-bold'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                    {item.children && item.children.map((child) => (
                                        <div className="ml-3" key={"mobileDisclosureChildDiv-" + child.name}>
                                            <a
                                                key={"mobileDisclosureChildLink-" + child.name}
                                                href={child.href}
                                                className='block px-3 ml-2 py-2 text-base font-medium'
                                            >
                                                {child.name}
                                            </a>
                                            {child.children && child.children.map((subchild) => (
                                                <a
                                                    key={"mobileDisclosureSubChildLink-" + subchild.name}
                                                    href={subchild.href}
                                                    className='block px-3 ml-5 pl-5 py-2 text-base font-medium'
                                                >
                                                    {subchild.name}
                                                </a>
                                            ))}
                                        </div>
                                    ))}
                                </span>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
