import PageLayout from "../layouts/PageLayout";
import PageTitle from "../components/generic/titles/page-title";
import React, {useContext} from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import GlobalContext from "../lib/global-context";
import {getFAQs, getFundValues, getPageByURI} from "../lib/api";
import {sorterFAQs} from "../lib/utils";
import Collapsible from "react-collapsible";
import {BsChevronDown} from "react-icons/bs";
import Splash from "../components/generic/splash/splash";

export default function FAQs({page, tickerData, faqs}) {
    const global = useContext(GlobalContext)

    global.currentSection = 0

    faqs.sort(sorterFAQs)

    let pageContext = {
        title: "FAQs",
        heading: `FAQs`,
        content: "",
        faqs: faqs,
        splash: null
    }

    if(page){
        if(page.title){
            pageContext.title = page.title
        }

        if(page?.featuredImage?.node?.sourceUrl){
            pageContext.splash = page.featuredImage.node?.sourceUrl
        }
    }

    return (
        <>
            <PageLayout title={pageContext.title} preview={false} tickerData={tickerData}>
                <PageTitle title={pageContext.heading}/>
                <Splash srcFull={pageContext.splash}/>

                <div className="w-full mx:auto">
                    {pageContext.faqs.map((faq) => (
                        <Collapsible trigger={[faq.faqFields.question, <BsChevronDown/>]}>
                            <div className="p-2">
                                {faq.faqFields.answer}
                            </div>
                        </Collapsible>
                    ))}

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
    const tickerData = await getFundValues(2)
    const faqs = await getFAQs()
    const page = await getPageByURI("frequently-asked-questions")
    return {
        props: {
            page,
            preview,
            tickerData,
            faqs
        },
    }
}
