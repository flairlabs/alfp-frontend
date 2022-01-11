import PageLayout from "../../layouts/PageLayout";
import PageTitle from "../../components/generic/titles/page-title";
import {useContext} from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import GlobalContext from "../../lib/global-context";
import {getBoardMembers, getFundValues, getPageByURI} from "../../lib/api";
import Splash from "../../components/generic/splash/splash";
import PersonCard from "../../components/generic/cards/person-card";
import {sorterBoardMember} from "../../lib/utils";
import {CMS_NAME} from "../../lib/constants";
import AboutHeader from "../../components/generic/about/about-header";
import CoverImage from "../../components/cover-image";
import PostBody from "../../components/post-body";

export default function BoardOfDirectors({tickerData, boardMembers, page}) {
    const global = useContext(GlobalContext)

    global.currentSection = 2

    boardMembers.sort(sorterBoardMember)

    const pageContext = {
        title: page.title,
        heading: `${page.title}`,
        content: page.content,
        coverImage: page.featuredImage?.node,
        persons: boardMembers
    }

    return (
        <>
            <PageLayout title={pageContext.title} preview={false} tickerData={tickerData}>
                <PageTitle title={pageContext.heading}/>

                <article className="page-text">
                    {pageContext.coverImage ? (

                        <img src={pageContext.coverImage.sourceUrl} width="100%"/>
                    ): <Splash srcFull="https://dummyimage.com/1920x300/dddddd/fff.jpg&text=placeholder" /> }

                    <PostBody content={page.content}/>

                </article>

                <div className="max-w mx-auto my-4 page-text my-4">
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
    const page = await getPageByURI("/board-of-directors/")
    return {
        props: {
            preview,
            tickerData,
            boardMembers,
            page
        },
    }
}
