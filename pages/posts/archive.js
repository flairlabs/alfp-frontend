import Head from 'next/head'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Layout from '../../components/layout'
import {getAllPostsForHome, getFundValues} from '../../lib/api'
import {CMS_NAME} from '../../lib/constants'
import Ticker from "../../components/generic/ticker/ticker";
import {useContext} from "react";
import GlobalContext from "../../lib/global-context";
import PageLayout from "../../layouts/PageLayout";
import Splash from "../../components/generic/splash/splash";

export default function PostArchive({allPosts: {edges}, preview, tickerData}) {
    const heroPost = edges[0]?.node
    const morePosts = edges.slice(1)
    const global = useContext(GlobalContext)

    global.currentSection = 0

    return (
        <PageLayout title="Home" preview={false} tickerData={tickerData}>
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
                {morePosts.length > 0 && <MoreStories posts={morePosts}/>}


        </PageLayout>
    )
}

export async function getStaticProps({preview = false}) {
    const allPosts = await getAllPostsForHome(preview)
    const tickerData = await getFundValues(2)
    return {
        props: {allPosts, preview, tickerData},
    }
}
