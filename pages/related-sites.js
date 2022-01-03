import PageLayout from "../layouts/PageLayout";
import PageTitle from "../components/generic/titles/page-title";
import {useContext} from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import GlobalContext from "../lib/global-context";
import {getFundValues, getPageByURI} from "../lib/api";
import CoverImage from "../components/cover-image";
import PostBody from "../components/post-body";
import {CMS_NAME} from "../lib/constants";
import Splash from "../components/generic/splash/splash";

export default function RelatedSites({tickerData, page}) {
    const global = useContext(GlobalContext)

    global.currentSection = 3

    const pageContext = {
        title: page.title,
        heading: `${page.title}`,
        content: page.content,
        coverImage: page.featuredImage?.node,
    }

    return (
        <>
            <PageLayout title={pageContext.title} preview={false} tickerData={tickerData}>
                <PageTitle title={pageContext.heading}/>
                <article className="page-text">
                    {pageContext.coverImage ? (
                        <Splash srcFull={pageContext.coverImage.sourceUrl} />
                    ): <Splash srcFull="https://dummyimage.com/1920x300/dddddd/fff.jpg&text=placeholder" /> }

                    <PostBody content={page.content}/>

                </article>


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
    const tickerData = await getFundValues(2)
    const page = await getPageByURI("/related-sites/")
    return {
        props: {
            preview,
            tickerData,
            page
        },
    }
}
