import PageLayout from "../../layouts/PageLayout";
import PageTitle from "../../components/generic/titles/page-title";
import {useContext} from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import GlobalContext from "../../lib/global-context";
import {useRouter} from "next/router";
import ErrorPage from "next/error";
import {getFileLibrary} from "../../lib/api";

export default function FileLibrary({fund = null}) {
    const global = useContext(GlobalContext)
    const router = useRouter()

    if (!router.isFallback && !fund?.id) {
        return <ErrorPage statusCode={404}/>
    }

    global.currentSection = 1

    const pageContext = {
        title: fund.title,
        heading: fund.title,
        content: fund.content,
    }


    return (
        <>
            <PageLayout title={pageContext.title} preview={false}>
                <PageTitle title={pageContext.heading}/>
                <div className="md:w-5/6 sm:w-full ml-auto mr-0 my-4 flex flex-wrap mx-auto overflow-hidden">
                    <div className="my-1 px-1 w-full overflow-hidden sm:w-full md:w-full lg:w-2/3">
                        <div className="page-text mb-3 page-text file-library-content"
                             dangerouslySetInnerHTML={{__html: pageContext.content}}/>

                    </div>

                </div>


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
    const data = await getFileLibrary(params.id)
    return {
        props: {
            preview,
            fund: data
        },
    }
}
