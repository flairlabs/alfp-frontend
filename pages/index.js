import Head from 'next/head'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import {getAllPages, getAllPostsForHome, getMainCarouselItems, getPagePreview} from '../lib/api'
import {CMS_NAME, PAGE_URLS} from '../lib/constants'
import GenericNavbar from "../components/generic/nav/navbar";
import Ticker from "../components/generic/ticker/ticker";
import HeroPage from "../components/hero-page";
import MasterNavbar from "../components/generic/nav/master-nav";
import {useContext} from "react";
import GlobalContext from "../lib/global-context";
import Image from "next/image";
import FundTableButtonModal from "../components/generic/modals/fund-table-button-modal";
import BlogArchiveModal from "../components/generic/modals/blog-archive-modal";

export default function Index({allPosts: {edges}, preview, frontPages, allMainCarouselItems=null}) {
    // const heroPost = edges[0]?.node
    const heroPage = frontPages["investment-basics"] ? frontPages["investment-basics"] : null
    // const morePosts = edges.slice(1)

    const global = useContext(GlobalContext)

    global.currentSection = 0

    return (
        <>
            <Layout preview={false}>
                <Head>
                    <title>{CMS_NAME}</title>
                </Head>
                <Container>


                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <Ticker/>
                        <Intro carouselItems={allMainCarouselItems}/>

                        {heroPage && (
                            <HeroPage
                                title={heroPage.title}
                                coverImage={heroPage.data.featuredImage?.node}
                                slug={heroPage.slug}
                                excerpt={heroPage.excerpt}
                                url={heroPage.url}
                            >

                            </HeroPage>
                        )}

                        {/*{heroPost && (*/}
                        {/*    <HeroPost*/}
                        {/*        title={heroPost.title}*/}
                        {/*        coverImage={heroPost.featuredImage?.node}*/}
                        {/*        date={heroPost.date}*/}
                        {/*        author={heroPost.author?.node}*/}
                        {/*        slug={heroPost.slug}*/}
                        {/*        excerpt={heroPost.excerpt}*/}
                        {/*    />*/}
                        {/*)}*/}
                        {/*{morePosts.length > 0 && <MoreStories posts={morePosts}/>}*/}

                        <hr className="my-4"/>


                        <div
                            className="py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">

                            <div className="rounded overflow-hidden shadow-lg pb-2">
                                <img src="/images/revenue.png" className="w-full"/>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Fixed Income Fund</div>
                                    <p className="text-gray-700 text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                                        nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <a href="#!"
                                       className="text-accent-1 hover:bg-accent-7 hover:text-white py-2 px-4 rounded-full block">
                                        ALFM Money Market Fund
                                    </a>
                                    <a href="#!"
                                       className="text-accent-1 hover:bg-accent-7 hover:text-white py-2 px-4 rounded-full block">
                                        ALFM Peso Bond Fund
                                    </a>
                                    <a href="#!"
                                       className="text-accent-1 hover:bg-accent-7 hover:text-white py-2 px-4 rounded-full block">
                                        ALFM Dollar Bond Fund
                                    </a>
                                    <a href="#!"
                                       className="text-accent-1 hover:bg-accent-7 hover:text-white py-2 px-4 rounded-full block">
                                        ALFM Euro Bond Fund
                                    </a>
                                </div>
                            </div>


                            <div className="rounded overflow-hidden shadow-lg pb-2">
                                <img src="/images/investing.png" className="w-full"/>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Equity Funds</div>
                                    <p className="text-gray-700 text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                                        nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <a href="#!"
                                       className="text-accent-1 hover:bg-accent-7 hover:text-white py-2 px-4 rounded-full block">
                                        ALFM Growth Fund
                                    </a>
                                    <a href="#!"
                                       className="text-accent-1 hover:bg-accent-7 hover:text-white py-2 px-4 rounded-full block">
                                        Philippine Stock Index Fund
                                    </a>
                                </div>
                            </div>

                            <div className="rounded overflow-hidden shadow-lg pb-2">
                                <img src="/images/factors.png" className="w-full"/>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Mixed Asset Funds</div>
                                    <p className="text-gray-700 text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
                                        nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <a href="#!"
                                       className="text-accent-1 hover:bg-accent-7 hover:text-white py-2 px-4 rounded-full block">
                                        ALFM Global Multi-Asset Income Fund
                                    </a>
                                </div>
                            </div>

                        </div>

                        <div>
                            <div className="flex flex-wrap -mx-2 overflow-hidden">

                                <div
                                    className="my-2 p-2 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:p-4 btn-card">
                                    <div
                                        className="bg-white flex items-center hover:bg-gray-200 p-3">
                                        <div className="w-1/4 mr-3 px-3">
                                            <Image src="/images/icons/finances.png" width="60%" height="60%"/>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-700 mb-2">
                                                <a href="#!">Historical Prices</a>
                                            </h3>

                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="my-2 p-2 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:p-4 btn-card">
                                    <div
                                        className="bg-white flex items-center hover:bg-gray-200 p-3">
                                        <div className="w-1/4 mr-3 px-3">
                                            <Image src="/images/icons/presentation.png" width="60%" height="60%"/>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-700 mb-2">Fund Fact Sheets</h3>

                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="my-2 p-2 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:p-4 btn-card">
                                    <div
                                        className="bg-white flex items-center hover:bg-gray-200 p-3">
                                        <div className="w-1/4 mr-3 px-3">
                                            <Image src="/images/icons/loudspeaker.png" width="60%" height="60%"/>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-700 mb-2">
                                                <BlogArchiveModal btnText="Announcements" />

                                            </h3>

                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="my-2 p-2 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:p-4 btn-card">
                                    <div
                                        className="bg-white flex items-center hover:bg-gray-200 p-3">
                                        <div className="w-1/4 mr-3 px-3">
                                            <Image src="/images/icons/safebox.png" width="60%" height="60%"/>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-700 mb-2">File Library</h3>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/*<section className="container mx-auto text-center py-6 mb-12">*/}
                        {/*    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-accent-1">*/}
                        {/*        Call to Action*/}
                        {/*    </h1>*/}
                        {/*    <div className="w-full mb-4">*/}
                        {/*        <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"/>*/}
                        {/*    </div>*/}
                        {/*    <h3 className="my-4 text-3xl block">*/}
                        {/*        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.*/}
                        {/*    </h3>*/}
                        {/*    <a href="#!"*/}
                        {/*       className="my-4 mx-auto lg:mx-0 hover:bg-accent-7 bg-accent-1 hover:text-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline">*/}
                        {/*        Go*/}
                        {/*    </a>*/}
                        {/*</section>*/}

                        {/*{morePosts.length > 0 && <MoreStories posts={morePosts}/>}*/}


                    </div>
                </Container>
            </Layout>
        </>
    )
}

// export async function getStaticProps({preview = false}) {
export async function getServerSideProps({params,req,res,query,preview = false,previewData,resolvedUrl,locale,locales,defaultLocale}) {

    const allPosts = await getAllPostsForHome(preview)
    const env = process.env.NODE_ENV
    const front_page_urls = PAGE_URLS[env].frontpage

    const allMainCarouselItems = await getMainCarouselItems()
    let frontPages = {}
    for (let i = 0; i < front_page_urls.length; i++) {
        const slug = front_page_urls[i].slug
        const id = front_page_urls[i].cms_id
        frontPages[slug] = {
            data: await getPagePreview(id),
            slug: slug,
            excerpt: front_page_urls[i].excerpt,
            title: front_page_urls[i].title,
            url: front_page_urls[i].url
        }
    }

    return {
        props: {allPosts, preview, frontPages, allMainCarouselItems},
    }
}
