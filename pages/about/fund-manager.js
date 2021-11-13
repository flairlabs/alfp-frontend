import PageLayout from "../../layouts/PageLayout";
import PageTitle from "../../components/generic/titles/page-title";
import {useContext} from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import GlobalContext from "../../lib/global-context";
import {getBoardMembers, getFundValues, getPageByURI} from "../../lib/api";
import CoverImage from "../../components/cover-image";
import PostBody from "../../components/post-body";
import PersonCard from "../../components/generic/cards/person-card";
import {CMS_NAME} from "../../lib/constants";
import {sorterBoardMember} from "../../lib/utils";

export default function FundManager({tickerData, boardMembers, page}) {
    const global = useContext(GlobalContext)

    global.currentSection = 2
    boardMembers.sort(sorterBoardMember)

    const pageContext = {
        title: page.title,
        heading: `${page.title} ${CMS_NAME}`,
        content: page.content,
        coverImage: page.featuredImage?.node,
        persons: boardMembers
    }

    return (
        <>
            <PageLayout title={pageContext.title} preview={false} tickerData={tickerData}>
                <PageTitle title={pageContext.heading}/>
                <article>
                    {pageContext.coverImage && (
                        <CoverImage title={pageContext.title} coverImage={pageContext.coverImage}
                                    slug={pageContext.slug}/>
                    )}

                    <PostBody content={page.content}/>

                </article>

                <h3>Board of Directors</h3>

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
                <div>
                    <h3>Other Mutual Funds managed by BIMI</h3>
                    <div className="flex flex-wrap -mx-1 overflow-hidden">

                        <div className="my-1 px-1 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4">
                            // content
                        </div>

                        <div className="my-1 px-1 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4">
                            // content
                        </div>

                        <div className="my-1 px-1 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4">
                            // content
                        </div>

                        <div className="my-1 px-1 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4">
                            // content
                        </div>

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
    return {
        props: {
            preview,
            tickerData,
            boardMembers,
            page
        },
    }
}
