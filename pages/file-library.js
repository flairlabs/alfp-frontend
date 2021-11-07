import {getFileLibraryItems, getFundValues} from "../lib/api";

export default function FileLibrary({fileLibraryItems, tickerData}) {

    console.log(fileLibraryItems, tickerData)

    return (<></>)

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
