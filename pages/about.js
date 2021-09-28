import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import {CMS_NAME} from '../lib/constants'
import GenericNavbar from "../components/generic/nav/navbar";
import Ticker from "../components/generic/ticker/ticker";

export default function About() {
    return (
        <>
            <Layout preview={false}>
                <Head>
                    <title>About {CMS_NAME}</title>
                </Head>
                <Container>
                    <GenericNavbar></GenericNavbar>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <Ticker></Ticker>

                        <h1 className="md:text-6xl sm:text-4xl my-5 text-center">About {CMS_NAME}</h1>

                        <img src="/static/splash-01.png" className="w-max"/>

                        <div className="md:w-5/6 sm:w-full mx-auto my-4">
                            <div
                                className="w-full flex flex-row flex-wrap p-3 antialiased">
                                <div className="md:w-1/6 w-full">
                                    <img className="antialiased"
                                         src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                                </div>
                                <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
                                    <div
                                        className="w-full text-gray-700 font-semibold relative pt-3 md:pt-0">
                                        <h3 className="text-right leading-tight">Juan dela Cruz</h3>
                                        <h4 className="text-normal text-right  text-gray-300">
                                            <span
                                                className="border-b border-dashed border-gray-500 pb-1">Position</span>
                                        </h4>

                                        <p className="my-3 font-normal">Nunc id cursus metus aliquam eleifend. Sit amet venenatis urna cursus eget. Bibendum neque egestas congue quisque egestas diam.</p>

                                    </div>
                                </div>
                            </div>

                            <div
                                className="w-full flex flex-row flex-wrap p-3 antialiased">
                                <div className="md:w-1/6 w-full">
                                    <img className="antialiased"
                                         src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                                </div>
                                <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
                                    <div
                                        className="w-full text-gray-700 font-semibold relative pt-3 md:pt-0">
                                        <h3 className="text-right leading-tight">Juan dela Cruz</h3>
                                        <h4 className="text-normal text-right  text-gray-300">
                                            <span
                                                className="border-b border-dashed border-gray-500 pb-1">Position</span>
                                        </h4>

                                        <p className="my-3 font-normal">Nunc id cursus metus aliquam eleifend. Sit amet venenatis urna cursus eget. Bibendum neque egestas congue quisque egestas diam.</p>

                                    </div>
                                </div>
                            </div>

                            <div
                                className="w-full flex flex-row flex-wrap p-3 antialiased">
                                <div className="md:w-1/6 w-full">
                                    <img className="antialiased"
                                         src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                                </div>
                                <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
                                    <div
                                        className="w-full text-gray-700 font-semibold relative pt-3 md:pt-0">
                                        <h3 className="text-right leading-tight">Juan dela Cruz</h3>
                                        <h4 className="text-normal text-right  text-gray-300">
                                            <span
                                                className="border-b border-dashed border-gray-500 pb-1">Position</span>
                                        </h4>

                                        <p className="my-3 font-normal">Nunc id cursus metus aliquam eleifend. Sit amet venenatis urna cursus eget. Bibendum neque egestas congue quisque egestas diam.</p>

                                    </div>
                                </div>
                            </div>

                            <div
                                className="w-full flex flex-row flex-wrap p-3 antialiased">
                                <div className="md:w-1/6 w-full">
                                    <img className="antialiased"
                                         src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                                </div>
                                <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
                                    <div
                                        className="w-full text-gray-700 font-semibold relative pt-3 md:pt-0">
                                        <h3 className="text-right leading-tight">Juan dela Cruz</h3>
                                        <h4 className="text-normal text-right  text-gray-300">
                                            <span
                                                className="border-b border-dashed border-gray-500 pb-1">Position</span>
                                        </h4>

                                        <p className="my-3 font-normal">Nunc id cursus metus aliquam eleifend. Sit amet venenatis urna cursus eget. Bibendum neque egestas congue quisque egestas diam.</p>

                                    </div>
                                </div>
                            </div>

                        </div>


                        <hr className="my-4"/>

                    </div>
                </Container>
            </Layout>
        </>
)
}
