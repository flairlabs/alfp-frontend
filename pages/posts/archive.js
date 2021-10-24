import Head from 'next/head'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Layout from '../../components/layout'
import {getAllPostsForHome} from '../../lib/api'
import {CMS_NAME} from '../../lib/constants'
import Ticker from "../../components/generic/ticker/ticker";
import {useContext} from "react";
import GlobalContext from "../../lib/global-context";

export default function PostArchive({ allPosts: { edges }, preview }) {
    const heroPost = edges[0]?.node
    const morePosts = edges.slice(1)
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


                    </div>
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps({preview = false}) {
    const allPosts = await getAllPostsForHome(preview)
    return {
        props: {allPosts, preview},
    }
}
