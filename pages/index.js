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

export default function Index({allPosts: {edges}, preview, frontPages, allMainCarouselItems=null}) {
    // const heroPost = edges[0]?.node
    const heroPage = frontPages["investment-basics"] ? frontPages["investment-basics"] : null
    // const morePosts = edges.slice(1)

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
                            className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
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
                                       className="bg-accent-1 hover:bg-accent-7 text-white font-bold py-2 px-4 rounded-full">
                                        Button
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
                                       className="bg-accent-1 hover:bg-accent-7 text-white font-bold py-2 px-4 rounded-full">
                                        Button
                                    </a>
                                </div>
                            </div>
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
                                <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"/>
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
