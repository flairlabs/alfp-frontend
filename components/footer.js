import {CMS_NAME} from '../lib/constants'
import {top_navigation} from "./generic/nav/master-nav";

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
                            <span className="text-xl text-white">{CMS_NAME}</span>
                        </a>
                        <p className="mt-2 text-sm text-white">
                            A Mutual Fund is an open end investment company registered with the Securities andExchange
                            Commission (SEC) in which the investible cash of numerous investors are pooled ina specific
                            fund ("fund") with the aim of achieving a specific investment objective.

                        </p>
                    </div>
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    {master_nav.map((nav, idx) => (

                            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                                <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">{nav.name}</h2>
                                <nav className="list-none mb-10">
                                    {nav.children.map((item) => (
                                        <>
                                            {hasChildren(item) ? (
                                                <li>
                                                    <span className='text-gray-300'>
                                                        {item.name}
                                                    </span>
                                                    <ul className='pl-3'>
                                                        {item.children.map((child) => (
                                                            <li>
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
                                        </>
                                    ))}
                                </nav>
                            </div>

                    ))}
                    </div>
                </div>
                <div className="bg-gray-700">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-white text-sm text-center sm:text-left">© 2021 ALFM Mutual Funds
                        </p>

                    </div>
                </div>
            </footer>
        </div>
    )
}
