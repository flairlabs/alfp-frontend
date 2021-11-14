import PageLayout from "../../layouts/PageLayout";
import PageTitle from "../../components/generic/titles/page-title";
import {useContext} from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import GlobalContext from "../../lib/global-context";
import {getDistributors, getFundValues} from "../../lib/api";
import {CMS_NAME} from "../../lib/constants";
import {sorterDistributor} from "../../lib/utils";
import PersonCard from "../../components/generic/cards/person-card";
import Splash from "../../components/generic/splash/splash";

export default function Distributors({tickerData, distributors}) {
    const global = useContext(GlobalContext)

    global.currentSection = 2

    distributors.sort(sorterDistributor)

    const pageContext = {
        title: "Distributors",
        heading: `Distributors`,
        content: "",
        persons: distributors
    }

    return (
        <>
            <PageLayout title={pageContext.title} preview={false} tickerData={tickerData}>
                <PageTitle title={pageContext.heading}/>
                <Splash srcFull="https://dummyimage.com/1920x300/dddddd/fff.jpg&text=placeholder" />

                <div className="max-w-2xl mx-auto my-4 page-text">
                    {pageContext.persons.map(( person) => (
                        <PersonCard
                            name={person.distributorFields.name}
                            position={person.distributorFields.position}
                            imgFull={person.featuredImage?.node?.sourceUrl}
                            imgMobile={person.featuredImage?.node?.sourceUrl}
                            url={null}
                            content={person.distributorFields.contactDetails} />
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
    const distributors = await getDistributors()
    return {
        props: {
            preview,
            tickerData,
            distributors
        },
    }
}
