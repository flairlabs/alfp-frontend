import PageLayout from "../../layouts/PageLayout";
import PageTitle from "../../components/generic/titles/page-title";
import {useContext} from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import GlobalContext from "../../lib/global-context";
import {getBoardMembers, getFundValues} from "../../lib/api";
import Splash from "../../components/generic/splash/splash";
import PersonCard from "../../components/generic/cards/person-card";
import {sorterBoardMember} from "../../lib/utils";
import {CMS_NAME} from "../../lib/constants";

export default function BoardOfDirectors({tickerData, boardMembers}) {
    const global = useContext(GlobalContext)

    global.currentSection = 2

    boardMembers.sort(sorterBoardMember)

    const pageContext = {
        title: "Board of Directors",
        heading: `Board of Directors`,
        content: "",
        persons: boardMembers
    }

    return (
        <>
            <PageLayout title={pageContext.title} preview={false} tickerData={tickerData}>
                <PageTitle title={pageContext.heading}/>
                <Splash srcFull="/images/featured-images/investment-basics.jpg" />

                <div className="md:w-5/6 sm:w-full mx-auto my-4">
                    {pageContext.persons.map(( person) => (
                        <PersonCard
                            name={person.boardMemberFields.name}
                            position={person.boardMemberFields.position}
                            imgFull={person.featuredImage?.node?.sourceUrl}
                            imgMobile={person.featuredImage?.node?.sourceUrl}
                            url={null}
                            content={person.boardMemberFields.description} />
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
    const boardMembers = await getBoardMembers()
    return {
        props: {
            preview,
            tickerData,
            boardMembers
        },
    }
}
