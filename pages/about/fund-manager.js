import PageLayout from "../../layouts/PageLayout";
import PageTitle from "../../components/generic/titles/page-title";
import {useContext} from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import GlobalContext from "../../lib/global-context";
import {getBoardMembers, getFundValues, getOtherFunds, getPageByURI} from "../../lib/api";
import CoverImage from "../../components/cover-image";
import PostBody from "../../components/post-body";
import PersonCard from "../../components/generic/cards/person-card";
import {CMS_NAME} from "../../lib/constants";
import {sorterBoardMember} from "../../lib/utils";
import Splash from "../../components/generic/splash/splash";
import AboutHeader from "../../components/generic/about/about-header";

export default function FundManager({tickerData, boardMembers, page, otherFunds}) {
    const global = useContext(GlobalContext)

    global.currentSection = 2
    boardMembers.sort(sorterBoardMember)

    const pageContext = {
        title: page.title,
        heading: page.title,
        content: page.content,
        coverImage: page.featuredImage?.node,
        persons: boardMembers,
        otherFunds: otherFunds
    }

    return (
        <>
            <PageLayout title={pageContext.title} preview={false} tickerData={tickerData}>
                <PageTitle title={pageContext.heading}/>

                <article className="page-text">
                    {pageContext.coverImage ? (
                        <CoverImage title={pageContext.title} coverImage={pageContext.coverImage}
                                    slug={pageContext.slug}/>
                    ): <Splash srcFull="https://dummyimage.com/1920x300/dddddd/fff.jpg&text=placeholder" /> }

                    <PostBody content={page.content}/>

                </article>

                <div className="max-w-2xl mx-auto my-4 page-text">
                    <h2>Board of Directors</h2>
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
                <div className="page-text">
                    <h2>Other Mutual Funds managed by BIMI</h2>
                    <div className="flex flex-wrap mb-2 -mx-1 overflow-hidden">
                        {otherFunds.map( (otherFund) => (
                            <div className="my-2 px-2 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4" key={"otherFunds-" + otherFund.title}>
                                <a href={otherFund?.otherFundFields?.link}>
                                    <img src={otherFund?.featuredImage?.node?.sourceUrl} />
                                </a>
                            </div>
                        ))}

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
    const tickerData = await getFundValues(2)
    const boardMembers = await getBoardMembers()
    const page = await getPageByURI("/fund-manager/")
    const otherFunds = await getOtherFunds()
    return {
        props: {
            preview,
            tickerData,
            boardMembers,
            page,
            otherFunds
        },
    }
}
