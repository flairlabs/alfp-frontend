import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import {getAllPostsForHome, getFundValues} from '../../lib/api'
import {useContext} from "react";
import GlobalContext from "../../lib/global-context";
import PageLayout from "../../layouts/PageLayout";

export default function PostArchive({allPosts: {edges}, preview, tickerData}) {
    const heroPost = edges[0]?.node
    const morePosts = edges.slice(1)
    const global = useContext(GlobalContext)

    global.currentSection = 0

    return (
        <PageLayout title="Archive" preview={false} tickerData={tickerData}>
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

export async function getServerSideProps({preview = false}) {
    const allPosts = await getAllPostsForHome(preview)
    const tickerData = await getFundValues(2)
    return {
        props: {allPosts, preview, tickerData},
    }
}
