import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '../../components/post-body'
import {getPage, getPageByURI} from '../../lib/api'
import PostTitle from '../../components/post-title'
import {CMS_NAME} from '../../lib/constants'
import "react-multi-carousel/lib/styles.css";
import PageLayout from "../../layouts/PageLayout";
import PageTitle from "../../components/generic/titles/page-title";
import CoverImage from "../../components/cover-image";

export default function Page({page}) {
    const router = useRouter()


    // if (!router.isFallback && !page?.id) {
    //     return <ErrorPage statusCode={404}/>
    // }

    const pageContext = {
        title: page.title,
        heading: `${page.title} ${CMS_NAME}`,
        coverImage: page.featuredImage?.node
    }


    return (
        <PageLayout title={pageContext.title} preview={false}>
            <PageTitle title={pageContext.heading}/>
            {router.isFallback ? (
                <PostTitle>Loading…</PostTitle>
            ) : (
                <>
                    <article>
                        {pageContext.coverImage && (
                            <CoverImage title={pageContext.title} coverImage={pageContext.coverImage}
                                        slug={pageContext.slug}/>
                        )}

                        <PostBody content={page.content}/>

                    </article>


                </>
            )}

        </PageLayout>
    )
}

// export async function getStaticProps({params, preview = false, previewData}) {
export async function getServerSideProps({params,req,res,query,preview = false,previewData,resolvedUrl,locale,locales,defaultLocale}) {
    const data = await getPageByURI(params.id)
    return {
        props: {
            preview,
            page: data
        },
    }
}

// export async function getStaticPaths() {
//     const allPages = await getAllPages()
//
//     return {
//         paths: allPages.edges.map(({node}) => `/page/${node.id}`) || [],
//         fallback: false,
//     }
// }
