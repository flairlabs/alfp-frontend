import Head from 'next/head'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import {getAllPages, getAllPostsForHome} from '../lib/api'
import {CMS_NAME} from '../lib/constants'
import GenericNavbar from "../components/generic/nav/navbar";
import Ticker from "../components/generic/ticker/ticker";

export default function Index({allPosts: {edges}, preview, allPages}) {
    const heroPost = edges[0]?.node
    const morePosts = edges.slice(1)
    return (
        <>
            <Layout preview={false}>
                <Head>
                    <title>{CMS_NAME}</title>
                </Head>
                <Container>
                    <GenericNavbar></GenericNavbar>

                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <Ticker></Ticker>
                        <Intro/>

                        {heroPost && (
                            <HeroPost
                                title={heroPost.title}
                                coverImage={heroPost.featuredImage?.node}
                                date={heroPost.date}
                                author={heroPost.author?.node}
                                slug={heroPost.slug}
                                excerpt={heroPost.excerpt}
                            />
                        )}
                        {/*{morePosts.length > 0 && <MoreStories posts={morePosts}/>}*/}

                        <hr className="my-4"/>

                        <div
                            className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                            <div className="rounded overflow-hidden shadow-lg pb-2">
                                <img src="/static/factors.png" className="w-full"/>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Mixed Asset Funds</div>
                                    <p className="text-gray-700 text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                                        nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <a href="#!"
                                       className="bg-accent-1 hover:bg-accent-7 text-white font-bold py-2 px-4 rounded-full">
                                        Button
                                    </a>
                                </div>
                            </div>
                            <div className="rounded overflow-hidden shadow-lg pb-2">
                                <img src="/static/investing.png" className="w-full"/>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Equity Funds</div>
                                    <p className="text-gray-700 text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                                        nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <a href="#!"
                                       className="bg-accent-1 hover:bg-accent-7 text-white font-bold py-2 px-4 rounded-full">
                                        Button
                                    </a>
                                </div>
                            </div>
                            <div className="rounded overflow-hidden shadow-lg pb-2">
                                <img src="/static/revenue.png" className="w-full"/>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Fixed Income Fund</div>
                                    <p className="text-gray-700 text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                                        nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <a href="#!"
                                       className="bg-accent-1 hover:bg-accent-7 text-white font-bold py-2 px-4 rounded-full">
                                        Button
                                    </a>
                                </div>
                            </div>
                        </div>

                        <section className="container mx-auto text-center py-6 mb-12">
                            <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-accent-1">
                                Call to Action
                            </h1>
                            <div className="w-full mb-4">
                                <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
                            </div>
                            <h3 className="my-4 text-3xl">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                            </h3>
                            <a href="#!"
                                className="my-4 mx-auto lg:mx-0 hover:bg-accent-7 bg-accent-1 hover:text-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline">
                                Go
                            </a>
                        </section>

                        {/*{morePosts.length > 0 && <MoreStories posts={morePosts}/>}*/}


                    </div>
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps({preview = false}) {
    const allPosts = await getAllPostsForHome(preview)
    const allPages = await getAllPages(preview)
    return {
        props: {allPosts, preview, allPages},
    }
}
