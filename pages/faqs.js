import PageLayout from "../layouts/PageLayout";
import PageTitle from "../components/generic/titles/page-title";
import React, {useContext} from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import GlobalContext from "../lib/global-context";
import {getFAQs, getFundValues} from "../lib/api";
import {sorterFAQs} from "../lib/utils";
import Collapsible from "react-collapsible";
import {BsChevronDown} from "react-icons/bs";

export default function FAQs({tickerData, faqs}) {
    const global = useContext(GlobalContext)

    global.currentSection = 0

    faqs.sort(sorterFAQs)

    const pageContext = {
        title: "FAQs",
        heading: `FAQs`,
        content: "",
        faqs: faqs
    }

    return (
        <>
            <PageLayout title={pageContext.title} preview={false} tickerData={tickerData}>
                <PageTitle title={pageContext.heading}/>

                <div className="md:w-5/6 sm:w-full mx-auto my-4">
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
    return {
        props: {
            preview,
            tickerData,
            faqs
        },
    }
}
