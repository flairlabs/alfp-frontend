import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import Layout from '../../components/layout'
import {getAllPages, getAllPostsWithSlug, getPage} from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import {CMS_NAME} from '../../lib/constants'
import {GenericHero} from "../../components/generic/hero/generic-hero";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Page({page}) {
    const router = useRouter()


    if (!router.isFallback && !page?.id) {
        return <ErrorPage statusCode={404}/>
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <Layout preview={false}>
            <Container>
                <Header/>
                {router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <article>
                            <Head>
                                <title>
                                    {page.title} | Next.js Blog Example with {CMS_NAME}
                                </title>

                            </Head>
                            <h3>{page.title}</h3>
                            <Carousel
                                swipeable={false}
                                draggable={true}
                                showDots={true}
                                responsive={responsive}
                                ssr={false} // means to render carousel on server-side.
                                infinite={true}
                                autoPlay={false}
                                autoPlaySpeed={1000}
                                keyBoardControl={true}
                                customTransition="all .5"
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >
                                <div>
                                    <img src={"https://images.unsplash.com/photo-1601588418480-f9923200a05f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} />
                                </div>
                                <div>Item 2</div>
                                <div>Item 3</div>
                                <div>Item 4</div>
                            </Carousel>


                            <GenericHero
                                title={
                                    <h4>Generic Hero Title</h4>
                                }
                                description={"desc"}
                                button={
                                    <a href={"#"}>button</a>
                                }
                            />

                            <PostBody content={page.content}/>

                        </article>


                    </>
                )}
            </Container>
        </Layout>
    )
}

export async function getStaticProps({params, preview = false, previewData}) {
    const data = await getPage(params.id)
    return {
        props: {
            preview,
            page: data
        },
    }
}

export async function getStaticPaths() {
    const allPages = await getAllPages()

    return {
        paths: allPages.edges.map(({node}) => `/page/${node.id}`) || [],
        fallback: true,
    }
}
