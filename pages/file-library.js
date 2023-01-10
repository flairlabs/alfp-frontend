import React, {useState} from 'react';
import Collapsible from 'react-collapsible';
import {getFileLibraryItemByTypeSlug, getFunds, getFundValues, getPageByURI, getDailyMutualFunds} from "../lib/api";
import {FileLibraryItemGroup} from "../components/generic/file-library/file-library-item-group";
import {CustomInputText} from "../components/generic/form/custom-input-text";
import {
    filterAnnualGeneralMeeting,
    filterAnnualReport,
    filterFundFactSheet,
    filterInvestmentsWeekly,
    prepOtherFiles
} from "../lib/file-library"
import {CustomSelect} from "../components/generic/form/custom-select";
import {FileLibraryListGroup} from "../components/generic/file-library/file-library-list-group";
import {GenericListWrapper} from "../components/generic/file-library/generic-list-wrapper";
import {OtherFileLibraryItems} from "../components/generic/file-library/others";
import {BsChevronDown} from "react-icons/bs";
import Splash from "../components/generic/splash/splash";
import PageTitle from "../components/generic/titles/page-title";
import PageLayout from "../layouts/PageLayout";
import {InvestmentsWeeklyItems} from "../components/generic/file-library/investments-weekly";
import {MutualFundsDailyMonitor} from "../components/generic/file-library/mutual-funds-daily-monitor"; //react-icon


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
                                        otherFiles,
                                        investmentsWeekly,
                                        mutualFundsDailyMonitor
                                    }) {
    // const fileLibraryNodes = prepFileLibraryItemGroups(fileLibraryItems)

    //Passes Funds Array and slug you want to remove
    function removeObjectWithId(arr, id) {
        const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
        arr.splice(objWithIdIndex, 1);
      
        return arr;
    }

    //Remove the USD version
    removeObjectWithId(funds, "cG9zdDoyODc=");

    const customFunds = [
        {id: "specialCase", title: "Mutual Funds"},

    ]

    // Special Fund to be consolidated
    const alfmGMAIF = funds.filter(fund => fund.id == 'cG9zdDoxMjg1');
    alfmGMAIF[0].title = 'ALFM Global Multi-Asset Income Fund';

    //removeObjectWithId(funds, "cG9zdDoxMjg1");
    funds.push(alfmGMAIF);

    
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

    const [formInvestmentsWeekly, updateFormInvestmentsWeekly] = useState({})
    let [investmentsWeeklyItems, updateInvestmentsWeeklyItems] = useState([])

    function setFormInvestmentsWeekly(e) {
        e.preventDefault()
        let items = investmentsWeekly[0]?.fileLibraryItems?.nodes

        let year = e.target[0].value
        let month = e.target[1].value

        if(items.length > 0){
            updateInvestmentsWeeklyItems(filterInvestmentsWeekly(items, year, month))
        }
    }

    /* Mutual Funds Daily Monitor */
    let [mutualFundsDailyMonitorItems, updateMutualFundsDailyMonitorItems] = useState([])
    async function setFormMutualFundsDailyMonitor(e) {
        e.preventDefault()
        //let items = mutualFundsDailyMonitor[0]?.fileLibraryItems?.nodes

        let year = e.target[0].value
        let month = e.target[1].value

        //const items = await getDailyMutualFunds("mutual-funds-daily-monitor");

        /* Had to put front end fetching of data here, because server side doesn't allow me to fetch data on button press */

        await fetch('https://alfm-backend-prod.magpie.ph/graphql/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `
                query FileLibraryItems {
                    fileLibraryItemTypes(
                      first: 1000000
                      where: {slug: "mutual-funds-daily-monitor"}
                    ) {
                      nodes {
                        name
                        slug
                        fileLibraryItems(
                          first: 1000000
                          where: {status: PUBLISH, orderby: {field: DATE, order: DESC}, dateQuery: {month: ${month}, year: ${year}}}
                        ) {
                          nodes {
                            id
                            title
                            fileLibraryItem {
                              document
                              fund {
                                ... on Fund {
                                  id
                                  title
                                }
                              }
                              month
                              year
                              file {
                                sourceUrl
                                mediaItemUrl
                              }
                            }
                          }
                        }
                        fileLibraryTaxonomyFields {
                          fileLibraryType
                          order
                        }
                      }
                    }
                  }     
                `
            })
        })
	.then(res => res.json())
	.then(res => {
        const data = res.data;

        const items = data.fileLibraryItemTypes.nodes[0].fileLibraryItems.nodes


        if(items.length > 0){
            updateMutualFundsDailyMonitorItems(filterInvestmentsWeekly(items))
        }
    })


        
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
        title: "File Library",
        splash: "https://dummyimage.com/1920x300/dddddd/fff.jpg&text=placeholder"
    }

    if (page) {
        if (page.title) {
            pageContext.title = page.title
        }

        if (page?.featuredImage?.node?.sourceUrl) {
            pageContext.splash = page.featuredImage.node?.sourceUrl
        }
    }

    const currentYear = new Date().getFullYear().toString()
    let currentMonth = new Date().getMonth() + 1
    currentMonth = currentMonth.toString()

    return (
        <>
            <PageLayout title={pageContext.title} preview={false} tickerData={tickerData}>
                <PageTitle title={pageContext.title}/>

                <Splash srcFull={pageContext.splash}/>
                <div className="tabs">

                    {/* Prospectus */}
                    <Collapsible trigger={["Prospectus", <BsChevronDown/>]}>
                        <FileLibraryItemGroup props={prospecti}/>
                    </Collapsible>

                    {/* Product Highlight Sheet */}
                    <Collapsible trigger={["Product Highlight Sheets", <BsChevronDown/>]}>
                        <FileLibraryItemGroup props={productHighlightSheet}/>
                    </Collapsible>
                    {/* Fund Facts Sheet */}
                    <Collapsible trigger={["Fund Fact Sheets", <BsChevronDown/>]}>
                        <form
                            className="flex flex-row justify-between overflow-hidden items-stretch"
                            onSubmit={setFormFundFactSheet}>

                            <div className="mr-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                <CustomInputText name="fundFactSheetYear" id="fundFactSheetYear"
                                                 type="number" placeholder={currentYear} />
                            </div>

                            <div className="mr-2">

                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Month</label>
                                <select name="fundFactSheetMonth" id="fundFactSheetMonth"
                                        className="w-full border bg-white rounded px-3 py-2 outline-none">
                                    <option></option>
                                    {currentMonth === "1" ? <option value="1" selected="selected">January</option> :
                                        <option value="1">January</option>}
                                    {currentMonth === "2" ? <option value="2" selected="selected">February</option> :
                                        <option value="2">February</option>}
                                    {currentMonth === "3" ? <option value="3" selected="selected">March</option> :
                                        <option value="3">March</option>}
                                    {currentMonth === "4" ? <option value="4" selected="selected">April</option> :
                                        <option value="4">April</option>}
                                    {currentMonth === "5" ? <option value="5" selected="selected">May</option> :
                                        <option value="5">May</option>}
                                    {currentMonth === "6" ? <option value="6" selected="selected">June</option> :
                                        <option value="6">June</option>}
                                    {currentMonth === "7" ? <option value="7" selected="selected">July</option> :
                                        <option value="7">July</option>}
                                    {currentMonth === "8" ? <option value="8" selected="selected">August</option> :
                                        <option value="8">August</option>}
                                    {currentMonth === "9" ? <option value="9" selected="selected">September</option> :
                                        <option value="9">September</option>}
                                    {currentMonth === "10" ? <option value="10" selected="selected">October</option> :
                                        <option value="10">October</option>}
                                    {currentMonth === "11" ? <option value="11" selected="selected">November</option> :
                                        <option value="11">November</option>}
                                    {currentMonth === "12" ? <option value="12" selected="selected">December</option> :
                                        <option value="12">December</option>}
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
                    {/* Forms */}
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
                    {/* Annual Reports */}
                    <Collapsible trigger={["Annual Reports", <BsChevronDown/>]}>
                        <form
                            className="flex flex-row justify-between overflow-hidden items-stretch"
                            onSubmit={setAnnualReportList}>

                            <div className="mr-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                <CustomInputText name="annualReportYear" id="annualReportYear"
                                                 type="number" placeholder={currentYear} />
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
                    {/* Annual General Meetigns */}
                    <Collapsible trigger={["Annual General Meetings", <BsChevronDown/>]}>
                        <form
                            className="flex flex-row justify-between overflow-hidden items-stretch"
                            onSubmit={setAnnualGeneralMeetingList}>

                            <div className="mr-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                <CustomInputText name="annualGeneralMeetingYear" id="annualGeneralMeetingYear"
                                                 type="number" placeholder={currentYear} />
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
                    {/* Investments Weekly */}
                    <Collapsible trigger={["Investments Weekly", <BsChevronDown/>]}>
                        <form
                            className="flex flex-row justify-between overflow-hidden items-stretch"
                            onSubmit={setFormInvestmentsWeekly}>

                            <div className="mr-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                <CustomInputText name="investmentsWeeklyYear" id="investmentsWeeklyYear"
                                                 type="number" placeholder={currentYear} />
                            </div>

                            <div className="mr-2">

                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Month</label>
                                <select name="investmentsWeeklyMonth" id="investmentsWeeklyMonth"
                                        className="w-full border bg-white rounded px-3 py-2 outline-none">
                                    <option></option>
                                    {currentMonth === "1" ? <option value="1" selected="selected">January</option> :
                                        <option value="1">January</option>}
                                    {currentMonth === "2" ? <option value="2" selected="selected">February</option> :
                                        <option value="2">February</option>}
                                    {currentMonth === "3" ? <option value="3" selected="selected">March</option> :
                                        <option value="3">March</option>}
                                    {currentMonth === "4" ? <option value="4" selected="selected">April</option> :
                                        <option value="4">April</option>}
                                    {currentMonth === "5" ? <option value="5" selected="selected">May</option> :
                                        <option value="5">May</option>}
                                    {currentMonth === "6" ? <option value="6" selected="selected">June</option> :
                                        <option value="6">June</option>}
                                    {currentMonth === "7" ? <option value="7" selected="selected">July</option> :
                                        <option value="7">July</option>}
                                    {currentMonth === "8" ? <option value="8" selected="selected">August</option> :
                                        <option value="8">August</option>}
                                    {currentMonth === "9" ? <option value="9" selected="selected">September</option> :
                                        <option value="9">September</option>}
                                    {currentMonth === "10" ? <option value="10" selected="selected">October</option> :
                                        <option value="10">October</option>}
                                    {currentMonth === "11" ? <option value="11" selected="selected">November</option> :
                                        <option value="11">November</option>}
                                    {currentMonth === "12" ? <option value="12" selected="selected">December</option> :
                                        <option value="12">December</option>}
                                </select>
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
                        {investmentsWeeklyItems.length > 0 ?
                            <div className="block my-3">
                                <InvestmentsWeeklyItems items={investmentsWeeklyItems}/>
                            </div>
                            : ""}
                    </Collapsible>
                    {/* Mutual Funds Daily Monitor */}
                    <Collapsible trigger={["Mutual Funds Daily Monitor", <BsChevronDown/>]}>
                        <form
                            className="flex flex-row justify-between overflow-hidden items-stretch"
                            onSubmit={setFormMutualFundsDailyMonitor}>

                            <div className="mr-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                <CustomInputText name="mutualFundsDailyMonitorYear" id="mutualFundsDailyMonitorYear"
                                                 type="number" placeholder={currentYear} />
                            </div>

                            <div className="mr-2">

                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2">Month</label>
                                <select name="mutualFundsDailyMonitorMonth" id="mutualFundsDailyMonitorMonth"
                                        className="w-full border bg-white rounded px-3 py-2 outline-none" required>
                                    <option></option>
                                    {currentMonth === "1" ? <option value="1" selected="selected">January</option> :
                                        <option value="1">January</option>}
                                    {currentMonth === "2" ? <option value="2" selected="selected">February</option> :
                                        <option value="2">February</option>}
                                    {currentMonth === "3" ? <option value="3" selected="selected">March</option> :
                                        <option value="3">March</option>}
                                    {currentMonth === "4" ? <option value="4" selected="selected">April</option> :
                                        <option value="4">April</option>}
                                    {currentMonth === "5" ? <option value="5" selected="selected">May</option> :
                                        <option value="5">May</option>}
                                    {currentMonth === "6" ? <option value="6" selected="selected">June</option> :
                                        <option value="6">June</option>}
                                    {currentMonth === "7" ? <option value="7" selected="selected">July</option> :
                                        <option value="7">July</option>}
                                    {currentMonth === "8" ? <option value="8" selected="selected">August</option> :
                                        <option value="8">August</option>}
                                    {currentMonth === "9" ? <option value="9" selected="selected">September</option> :
                                        <option value="9">September</option>}
                                    {currentMonth === "10" ? <option value="10" selected="selected">October</option> :
                                        <option value="10">October</option>}
                                    {currentMonth === "11" ? <option value="11" selected="selected">November</option> :
                                        <option value="11">November</option>}
                                    {currentMonth === "12" ? <option value="12" selected="selected">December</option> :
                                        <option value="12">December</option>}
                                </select>
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
                        {mutualFundsDailyMonitorItems.length > 0 ?
                            <div className="block my-3">
                                <MutualFundsDailyMonitor items={mutualFundsDailyMonitorItems}/>
                            </div>
                            : ""}
                    </Collapsible>
                    {/* Others */}
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

    const investmentsWeekly = await getFileLibraryItemByTypeSlug("investments-weekly")

    //const mutualFundsDailyMonitor = await mutualFundsDailyMonitor("mutual-funds-daily-monitor")
    //const mutualFundsDailyMonitor = await getFileLibraryItemByTypeSlug("mutual-funds-daily-monitor")
    

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
            otherFiles,
            investmentsWeekly,
            //mutualFundsDailyMonitor
        }
    }
}
