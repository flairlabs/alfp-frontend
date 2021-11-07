import {getFileLibraryItems, getFundValues} from "../lib/api";
import Head from "next/head";
import {CMS_NAME} from "../lib/constants";
import Container from "../components/container";
import Ticker from "../components/generic/ticker/ticker";
import Layout from "../components/layout";
import {FileLibraryItemGroup} from "../components/generic/file-library/file-library-item-group";
import {CustomInputText} from "../components/generic/form/custom-input-text";
import {useState} from "react";
import {useForm, FormContext} from "react-hook-form";

function compare(a, b) {
    if (!a.fileLibraryTaxonomyFields.order) {
        return -1;
    }
    if (!b.fileLibraryTaxonomyFields.order) {
        return 1;
    }
    if (a.fileLibraryTaxonomyFields.order < b.fileLibraryTaxonomyFields.order)
        return -1;
    if (a.fileLibraryTaxonomyFields.order > b.fileLibraryTaxonomyFields.order)
        return 1;
    return 0;
}

function prepFileLibraryItemGroups(fileLibraryItems) {
    let nodes;
    nodes = fileLibraryItems.sort(compare);
    return nodes
}

export default function FileLibrary({fileLibraryItems, tickerData}) {
    const fileLibraryNodes = prepFileLibraryItemGroups(fileLibraryItems)

    const [formFundFactSheet, updateFormFundFactSheet] = useState({})

    function setFormFundFactSheet(e) {
        e.preventDefault()
        console.log(e.target[0].value, e.target[1].value, e.target[2].value)
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
                                                    <form className="flex flex-wrap -mx-1 overflow-hidden"
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
                                                            <select name="fundFactSheetMonth">
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
                                                        </div>

                                                        <div
                                                            className="my-1 px-1 w-full overflow-hidden sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4">
                                                            <button type="submit" className="btn btn-primary">Search</button>
                                                        </div>

                                                    </form>
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
    const tickerData = await getFundValues(2)

    return {
        props: {
            fileLibraryItems,
            tickerData
        }
    }
}
