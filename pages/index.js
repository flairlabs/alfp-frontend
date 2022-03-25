import Intro from '../components/intro'
import {getAllPostsForHome, getFundValues, getMainCarouselItems, getPagePreview, getRelatedSitesMenu} from '../lib/api'
import {PAGE_URLS} from '../lib/constants'
import HeroPage from "../components/hero-page";
import {useContext} from "react";
import GlobalContext from "../lib/global-context";
import PageLayout from "../layouts/PageLayout";

export default function Index({allPosts: {edges}, preview, frontPages, allMainCarouselItems = null, tickerData, relatedSites = []}) {
    // const heroPost = edges[0]?.node
    const heroPage = frontPages["investment-basics"] ? frontPages["investment-basics"] : null
    // const morePosts = edges.slice(1)

    const global = useContext(GlobalContext)

    global.currentSection = 0

    return (
        <>
            <PageLayout title="Home" preview={false} tickerData={tickerData} relatedSites={relatedSites}>
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

                <hr className="my-4"/>

                <div>
                    <div>
                        <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
                            Mutual Funds
                        </h3>
                    </div>
                    <div>
                        <div className="text-lg leading-relaxed mb-4">
                            ALFM Mutual Funds have six different fund types that meet various investment objectives.
                            Investors can create their own diversified investment portfolio by investing in several
                            funds
                            with varying amounts depending on their tolerance for investment risk. For the appropriate
                            mix
                            that is suitable to you, you may contact your Mutual Funds Sales Agent who is prepared to
                            advise
                            you on the benefits, risks, and features of mutual funds investing.
                        </div>
                    </div>
                </div>

                <div
                    className="py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">

                    <div className="rounded overflow-hidden shadow-lg pb-2">
                        <img src="/images/revenue-box.png" className="w-auto h-64 mx-auto"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Fixed Income Fund</div>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <a href="/funds/alfm-money-market-fund"
                               className="text-accent-2 hover:bg-accent-1 hover:text-white py-2 px-4 block">
                                ALFM Money Market Fund
                            </a>
                            <a href="/funds/alfm-peso-bond-fund"
                               className="text-accent-2 hover:bg-accent-1 hover:text-white py-2 px-4 block">
                                ALFM Peso Bond Fund
                            </a>
                            <a href="/funds/alfm-dollar-bond-fund"
                               className="text-accent-2 hover:bg-accent-1 hover:text-white py-2 px-4 block">
                                ALFM Dollar Bond Fund
                            </a>
                            <a href="/funds/alfm-euro-bond-fund"
                               className="text-accent-2 hover:bg-accent-1 hover:text-white py-2 px-4 block">
                                ALFM Euro Bond Fund
                            </a>
                        </div>
                    </div>


                    <div className="rounded overflow-hidden shadow-lg pb-2">
                            <img src="/images/investing-box.png" className="w-auto h-64 mx-auto object-center"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Equity Funds</div>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <a href="/funds/alfm-growth-fund"
                               className="text-accent-2 hover:bg-accent-1 hover:text-white py-2 px-4 block">
                                ALFM Growth Fund
                            </a>
                            <a href="/funds/philippine-stock-index-fund"
                               className="text-accent-2 hover:bg-accent-1 hover:text-white py-2 px-4 block">
                                Philippine Stock Index Fund
                            </a>
                            <a href="/funds/philippine-stock-index-fund-units"
                               className="text-accent-2 hover:bg-accent-1 hover:text-white py-2 px-4 block">
                                Philippine Stock Index Fund (Units)
                            </a>
                        </div>
                    </div>

                    <div className="rounded overflow-hidden shadow-lg pb-2">
                        <img src="/images/factors-box.png" className="w-auto h-64 mx-auto"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Mixed Asset Funds</div>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <a href="/funds/alfm-global-muti-asset-income-fund"
                               className="text-accent-2 hover:bg-accent-1 hover:text-white py-2 px-4 block">
                                ALFM Global Multi-Asset Income Fund (USD)
                            </a>
                            <a href="/funds/alfm-global-muti-asset-income-fund-php"
                               className="text-accent-2 hover:bg-accent-1 hover:text-white py-2 px-4 block">
                                ALFM Global Multi-Asset Income Fund (PHP)
                            </a>
                        </div>
                    </div>

                </div>

                <div>
                    <div className="flex flex-wrap -mx-2 overflow-hidden">

                        <div
                            className="my-2 p-2 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:p-4 btn-card">
                            <div
                                className="bg-white flex items-center hover:bg-accent-1 p-3">
                                <div className="w-1/4 mr-3 px-3">
                                    <img src="/images/icons/loudspeaker.png" width="60%" height="60%"/>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                                        <a href="/posts/archive">Announcements</a>

                                    </h3>

                                </div>
                            </div>
                        </div>
                        <div
                            className="my-2 p-2 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:p-4 btn-card">
                            <div
                                className="bg-white flex items-center hover:bg-accent-1 p-3">
                                <div className="w-1/4 mr-3 px-3">
                                    <img src="/images/icons/safebox.png" width="60%" height="60%"/>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                                        <a href="/file-library">Downloadable Files</a>
                                    </h3>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                {tickerData.map((item) => (
                    <>{item.title}
                        <pre>{JSON.stringify(item)}</pre>

                        <hr/>
                    </>
                ))}


            </PageLayout>
        </>
    )
}

export async function getServerSideProps({
                                             params,
                                             req,
                                             res,
                                             query,
                                             preview = false,
                                             previewData,
                                             resolvedUrl,
                                             locale,
                                             locales,
                                             defaultLocale
                                         }) {

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

    const tickerData = await getFundValues(2)
    const relatedSites = await getRelatedSitesMenu()

    console.log(tickerData)

    return {
        props: {allPosts, preview, frontPages, allMainCarouselItems, tickerData, relatedSites},
    }
}
