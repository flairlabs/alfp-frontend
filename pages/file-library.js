import {getFileLibraryItems, getFundValues} from "../lib/api";
import Head from "next/head";
import {CMS_NAME} from "../lib/constants";
import Container from "../components/container";
import Ticker from "../components/generic/ticker/ticker";
import Layout from "../components/layout";
import {FileLibraryItemGroup} from "../components/generic/file-library/file-library-item-group";

function compare(a,b) {
    if(!a.fileLibraryTaxonomyFields.order) {
        return -1;
    }
    if(!b.fileLibraryTaxonomyFields.order) {
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

                                    fileLibraryItem.fileLibraryTaxonomyFields.fileLibraryType === "flat" ? <FileLibraryItemGroup props={fileLibraryItem} /> : (
                                        fileLibraryItem.fileLibraryTaxonomyFields.fileLibraryType === "fund_fact_sheet" ? "fund fact sheet" : "null"
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
