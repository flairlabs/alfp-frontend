import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import {getAllPostsWithSlug, getFundValues, getPostAndMorePosts} from '../../lib/api'
import Tags from '../../components/tags'
import PageLayout from "../../layouts/PageLayout";

export default function Post({post, posts, preview, tickerData}) {
    const router = useRouter()
    const morePosts = posts?.edges

    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404}/>
    }

    return (
        <PageLayout title="Home" preview={false} tickerData={tickerData}>
            <PostHeader
                title={post.title}
                coverImage={post.featuredImage?.node}
                date={post.date}
                author={post.author?.node}
                categories={post.categories}
            />
            <PostBody content={post.content}/>
            <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags}/>}
            </footer>

            <SectionSeparator/>
            {morePosts.length > 0 && <MoreStories posts={morePosts}/>}
        </PageLayout>


    )
}

export async function getServerSideProps( {params, preview = false, previewData }) {
    const allPosts = await getAllPostsWithSlug()
    const paths = allPosts.edges.map(({node}) => `/posts/${node.slug}`) || []
    const tickerData = await getFundValues(2)
    const data = await getPostAndMorePosts(params.slug, preview, previewData)
    return {
        props: {
            preview,
            paths: paths,
            post: data.post,
            posts: data.posts,
            tickerData
        },
    }
}
