import {getFileLibraryItems, getFundValues, getFunds} from "../lib/api";
import Head from "next/head";
import {CMS_NAME} from "../lib/constants";
import Container from "../components/container";
import Ticker from "../components/generic/ticker/ticker";
import Layout from "../components/layout";
import {FileLibraryItemGroup} from "../components/generic/file-library/file-library-item-group";
import {CustomInputText} from "../components/generic/form/custom-input-text";
import {useEffect, useState} from "react";
import {filterFundFactSheet, getFundFactSheets, prepFileLibraryItemGroups} from "../lib/file-library"
import {useForm, FormContext} from "react-hook-form";
import {CustomSelect} from "../components/generic/form/custom-select";
import {FundFactSheetItems} from "../components/generic/file-library/fund-fact-sheet";


export default function FileLibrary({fileLibraryItems, funds, tickerData}) {
    const fileLibraryNodes = prepFileLibraryItemGroups(fileLibraryItems)

    const [formFundFactSheet, updateFormFundFactSheet] = useState({})
    let [fundFactSheets, updateFundFactSheets] = useState([])

    function setFormFundFactSheet(e) {
        e.preventDefault()
        let items = getFundFactSheets(fileLibraryItems)

        let year = e.target[0].value
        let month = e.target[1].value
        let fund = e.target[2].value

        if(items.length > 0) {
            updateFundFactSheets(filterFundFactSheet(items, year, month, fund))
        }
        console.log(fundFactSheets)
    }

    function updateFormFundFactSheetState() {

    }

    return (
        <>
            <Layout preview={false}>
                <Head>
                    <title>{CMS_NAME}</title>
                </Head>
                <Container>


                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <Ticker tickerData={tickerData}/>

                        {
                            fileLibraryNodes.map(fileLibraryItem => (

                                    fileLibraryItem.fileLibraryTaxonomyFields.fileLibraryType === "flat" ?
                                        <FileLibraryItemGroup props={fileLibraryItem}/> : (
                                            fileLibraryItem.fileLibraryTaxonomyFields.fileLibraryType === "fund_fact_sheet" ?
                                                <>
                                                    <form className="flex flex-wrap -mx-1 overflow-hidden justify-center  align-center"
                                                          onSubmit={setFormFundFactSheet}>

                                                        <div
                                                            className="my-1 px-1 w-full overflow-hidden sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4">
                                                            <label
                                                                className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                                            <CustomInputText name="fundFactSheetYear" id="fundFactSheetYear"
                                                                             type="number"/>
                                                        </div>

                                                        <div
                                                            className="my-1 px-1 w-full overflow-hidden sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4">

                                                            <label
                                                                className="block text-gray-700 text-sm font-bold mb-2">Month</label>
                                                            <select name="fundFactSheetMonth" id="fundFactSheetMonth" className="w-full border bg-white rounded px-3 py-2 outline-none">
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

                                                        <div
                                                            className="my-1 px-1 w-full overflow-hidden sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4">
                                                            <label
                                                                className="block text-gray-700 text-sm font-bold mb-2">Fund</label>
                                                            <CustomSelect name="fundFactSheetFund" id="fundFactSheetFund" options={funds} />
                                                        </div>

                                                        <div
                                                            className="my-1 px-1 w-full overflow-hidden sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 flex align-center justify-center">
                                                            <button type="submit" className="w-full bg-accent-1 hover:bg-accent-7 hover:text-white font-bold py-2 px-4 rounded">Search</button>
                                                        </div>

                                                    </form>
                                                    {fundFactSheets.length > 0 ? <FundFactSheetItems items={fundFactSheets} /> : ""}
                                                </>
                                                : "null"
                                        )
                                )
                            )

                        }
                    </div>
                </Container>
            </Layout>

        </>
    )

}

export async function getServerSideProps() {
    const fileLibraryItems = await getFileLibraryItems()
    const funds = await getFunds()
    const tickerData = await getFundValues(2)

    return {
        props: {
            fileLibraryItems,
            tickerData,
            funds
        }
    }
}
