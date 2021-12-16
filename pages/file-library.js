import React, {useState} from 'react';
import Collapsible from 'react-collapsible';
import {getFileLibraryItemByTypeSlug, getFunds, getFundValues, getPageByURI} from "../lib/api";
import {FileLibraryItemGroup} from "../components/generic/file-library/file-library-item-group";
import {CustomInputText} from "../components/generic/form/custom-input-text";
import {filterAnnualGeneralMeeting, filterAnnualReport, filterFundFactSheet, prepOtherFiles} from "../lib/file-library"
import {CustomSelect} from "../components/generic/form/custom-select";
import {FileLibraryListGroup} from "../components/generic/file-library/file-library-list-group";
import {GenericListWrapper} from "../components/generic/file-library/generic-list-wrapper";
import {OtherFileLibraryItems} from "../components/generic/file-library/others";
import {BsChevronDown} from "react-icons/bs";
import Splash from "../components/generic/splash/splash";
import PageTitle from "../components/generic/titles/page-title";
import PageLayout from "../layouts/PageLayout"; //react-icon


export default function FileLibrary({
                                        page,
                                        funds,
                                        tickerData,
                                        prospecti,
                                        fundSheets,
                                        bpi_individual,
                                        bpi_institutional,
                                        bimi_individual,
                                        bimi_institutional,
                                        productHighlightSheet,
                                        annualReports,
                                        annualGeneralMeeting,
                                        otherFiles
                                    }) {
    // const fileLibraryNodes = prepFileLibraryItemGroups(fileLibraryItems)

    const otherFileItems = prepOtherFiles(otherFiles[0]?.fileLibraryItems?.nodes)

    const [formFundFactSheet, updateFormFundFactSheet] = useState({})
    let [fundFactSheets, updateFundFactSheets] = useState([])

    function setFormFundFactSheet(e) {
        e.preventDefault()
        let items = fundSheets[0]?.fileLibraryItems?.nodes

        let year = e.target[0].value
        let month = e.target[1].value
        let fund = e.target[2].value

        if (items.length > 0) {
            updateFundFactSheets(filterFundFactSheet(items, year, month, fund))
        }
    }

    function updateFormFundFactSheetState() {

    }

    let [annualReportList, updateAnnualReportList] = useState([])

    function setAnnualReportList(e) {
        e.preventDefault()
        if (!annualReports) {
            return
        }
        let items = annualReports[0]?.fileLibraryItems?.nodes

        let year = e.target[0].value


        if (items.length > 0) {
            updateAnnualReportList(filterAnnualReport(items, year))
        }
    }

    let [annualGeneralMeetingList, updateAnnualGeneralMeetingList] = useState([])

    function setAnnualGeneralMeetingList(e) {
        e.preventDefault()
        if (!annualGeneralMeeting) {
            return
        }
        let items = annualGeneralMeeting[0]?.fileLibraryItems?.nodes

        let year = e.target[0].value
        let fund = e.target[2].value

        if (items.length > 0) {
            let res = filterAnnualGeneralMeeting(items, year, fund)
            updateAnnualGeneralMeetingList(res)
        }
    }

    let pageContext = {
        title: "File Library Test",
        splash: "https://dummyimage.com/1920x300/dddddd/fff.jpg&text=placeholder"
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
                <PageTitle title={pageContext.title}/>

                <Splash srcFull={pageContext.splash}/>
                <div className="tabs">
                    <Collapsible trigger={["Prospectus", <BsChevronDown/>]}>
                        <FileLibraryItemGroup props={prospecti}/>
                    </Collapsible>
                    <Collapsible trigger={["Product Highlight Sheets", <BsChevronDown/>]}>
                        <FileLibraryItemGroup props={productHighlightSheet}/>
                    </Collapsible>

                    <Collapsible trigger={["Fund Fact Sheets", <BsChevronDown/>]}>
                        <form
                            className="flex flex-row justify-between overflow-hidden items-stretch"
                            onSubmit={setFormFundFactSheet}>

                            <div className="mr-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                <CustomInputText name="fundFactSheetYear" id="fundFactSheetYear"
                                                 type="number"/>
                            </div>

                            <div className="mr-2">

                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Month</label>
                                <select name="fundFactSheetMonth" id="fundFactSheetMonth"
                                        className="w-full border bg-white rounded px-3 py-2 outline-none">
                                    <option></option>
                                    <option value="0">January</option>
                                    <option value="1">February</option>
                                    <option value="2">March</option>
                                    <option value="3">April</option>
                                    <option value="4">May</option>
                                    <option value="5">June</option>
                                    <option value="6">July</option>
                                    <option value="7">August</option>
                                    <option value="8">September</option>
                                    <option value="9">October</option>
                                    <option value="10">November</option>
                                    <option value="11">December</option>
                                </select>
                            </div>

                            <div className="mr-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Fund</label>
                                <CustomSelect name="fundFactSheetFund" id="fundFactSheetFund"
                                              options={funds}/>
                            </div>

                            <div className="flex items-center">
                                <button type="submit"
                                        className="bg-accent-1 hover:bg-accent-7 hover:text-white font-bold py-2 px-4 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </button>
                            </div>

                        </form>
                        {fundFactSheets.length > 0 ?
                            <div className="block my-3">
                                <GenericListWrapper items={fundFactSheets}/>
                            </div>
                            : ""}
                    </Collapsible>

                    <Collapsible trigger={["Forms", <BsChevronDown/>]}>
                        <div className="flex flex-wrap -mx-2 overflow-hidden">
                            <div className="my-2 px-2 w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2">
                                <h3 className="text-2xl bold">I'm a BPI Client</h3>
                                <ul>
                                    <li className="ml-4">
                                        <p className="text-xl my-2 border-b">Individual</p>
                                        {bpi_individual.length > 0 ?
                                            <FileLibraryListGroup props={bpi_individual}/> : ""}
                                    </li>
                                    <li className="ml-4">
                                        <p className="text-xl my-2 border-b">Institutional</p>
                                        {bpi_institutional.length > 0 ?
                                            <FileLibraryListGroup props={bpi_institutional}/> : ""}
                                    </li>
                                </ul>
                            </div>
                            <div className="my-2 px-2 w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2">
                                <h3 className="text-2xl bold">I'm a BIMI Agent Client</h3>
                                <ul>
                                    <li className="ml-4">
                                        <p className="text-xl my-2 border-b">Individual</p>
                                        {bimi_individual.length > 0 ?
                                            <FileLibraryListGroup props={bimi_individual}/> : ""}
                                    </li>
                                    <li className="ml-4">
                                        <p className="text-xl my-2 border-b">Institutional</p>
                                        {bimi_institutional.length > 0 ?
                                            <FileLibraryListGroup props={bimi_institutional}/> : ""}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Collapsible>

                    <Collapsible trigger={["Annual Reports", <BsChevronDown/>]}>
                        <form
                            className="flex flex-row justify-between overflow-hidden items-stretch"
                            onSubmit={setAnnualReportList}>

                            <div className="mr-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                <CustomInputText name="annualReportYear" id="annualReportYear"
                                                 type="number"/>
                            </div>
                            <div className="flex items-center">
                                <button type="submit"
                                        className="bg-accent-1 hover:bg-accent-7 hover:text-white font-bold py-2 px-4 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                        {annualReportList.length > 0 ? <GenericListWrapper items={annualReportList}/> : ""}
                    </Collapsible>

                    <Collapsible trigger={["Annual General Meetings", <BsChevronDown/>]}>
                        <form
                            className="flex flex-row justify-between overflow-hidden items-stretch"
                            onSubmit={setAnnualGeneralMeetingList}>

                            <div className="mr-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                <CustomInputText name="annualGeneralMeetingYear" id="annualGeneralMeetingYear"
                                                 type="number"/>
                            </div>

                            <div className="mr-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Fund</label>
                                <CustomSelect name="annualGeneralMeetingFund" id="annualGeneralMeetingFund"
                                              options={funds}/>
                            </div>

                            <div className="flex items-center">
                                <button type="submit"
                                        className="bg-accent-1 hover:bg-accent-7 hover:text-white font-bold py-2 px-4 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </button>
                            </div>


                        </form>
                        {annualGeneralMeetingList.length > 0 ?
                            <GenericListWrapper items={annualGeneralMeetingList}/> : ""}

                    </Collapsible>
                    <Collapsible trigger={["Others", <BsChevronDown/>]}>
                        <OtherFileLibraryItems items={otherFileItems}/>
                    </Collapsible>
                </div>
            </PageLayout>

        </>
    )

}

export async function getServerSideProps() {
    const funds = await getFunds()
    const tickerData = await getFundValues(2)

    const prospecti = await getFileLibraryItemByTypeSlug("prospectus")
    const fundSheets = await getFileLibraryItemByTypeSlug("fund-fact-sheet")
    const bpi_individual = await getFileLibraryItemByTypeSlug("bpi-individual")
    const bpi_institutional = await getFileLibraryItemByTypeSlug("bpi-institutional")
    const bimi_individual = await getFileLibraryItemByTypeSlug("bimi-individual")
    const bimi_institutional = await getFileLibraryItemByTypeSlug("bimi-institutional")
    const productHighlightSheet = await getFileLibraryItemByTypeSlug("product-highlight-sheet")
    const annualReports = await getFileLibraryItemByTypeSlug("annual-report")
    const annualGeneralMeeting = await getFileLibraryItemByTypeSlug("annual-general-meeting")
    const otherFiles = await getFileLibraryItemByTypeSlug("other-documents-and-announcements")

    const page = await getPageByURI("file-library")

    return {
        props: {
            page,
            tickerData,
            funds,
            prospecti,
            fundSheets,
            bpi_individual,
            bpi_institutional,
            bimi_individual,
            bimi_institutional,
            productHighlightSheet,
            annualReports,
            annualGeneralMeeting,
            otherFiles
        }
    }
}
