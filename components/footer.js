import Container from './container'
import {CMS_NAME, EXAMPLE_PATH} from '../lib/constants'

export default function Footer() {
    return (
        <div>
            <footer className="bg-accent-1">
                <div
                    className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                            <span className="text-xl text-white">{CMS_NAME}</span>
                        </a>
                        <p className="mt-2 text-sm text-white">Air plant banjo lyft occupy retro adaptogen indego</p>
                    </div>
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">CATEGORIES</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">First Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Second Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Third Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">CATEGORIES</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">First Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Second Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Third Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">CATEGORIES</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">First Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Second Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Third Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">CATEGORIES</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">First Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Second Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Third Link</a>
                                </li>
                                <li>
                                    <a className="text-white hover:text-red-300" href="#">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-white text-sm text-center sm:text-left">© 2021 Magpie.IM —
                            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer"
                               className="text-gray-400 ml-1"
                               target="_blank">@Magpie</a>
                        </p>

                    </div>
                </div>
            </footer>
        </div>
    )
}
