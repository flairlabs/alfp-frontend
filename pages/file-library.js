import {getFileLibraryItems, getFundValues} from "../lib/api";
import {FileLibraryItemGroup} from "../components/generic/file-library/file-library-item-group";
import Head from "next/head";
import {CMS_NAME} from "../lib/constants";
import Container from "../components/container";
import Ticker from "../components/generic/ticker/ticker";
import Intro from "../components/intro";
import HeroPage from "../components/hero-page";
import Layout from "../components/layout";

export default function FileLibrary({fileLibraryItems, tickerData}) {

    return (
        <>
            <Layout preview={false}>
                <Head>
                    <title>{CMS_NAME}</title>
                </Head>
                <Container>


                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <Ticker tickerData={tickerData}/>

                        {fileLibraryItems.map(fileLibraryItem => <FileLibraryItemGroup props={fileLibraryItem} />)}
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
