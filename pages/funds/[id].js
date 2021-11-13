import PageLayout from "../../layouts/PageLayout";
import PageTitle from "../../components/generic/titles/page-title";
import {useContext, useEffect, useState} from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import GlobalContext from "../../lib/global-context";
import InfoTable from "../../components/generic/tables/info-table";
import {useRouter} from "next/router";
import ErrorPage from "next/error";
import {getFund, getFundValues} from "../../lib/api";
import FundTableButtonModal from "../../components/generic/modals/fund-table-button-modal";
import {processFundValues} from "../../lib/fund-values";

export default function Fund({fund = null, tickerData, fundValues}) {
    const global = useContext(GlobalContext)
    const router = useRouter()

    if (!router.isFallback && !fund?.id) {
        return <ErrorPage statusCode={404}/>
    }

    global.currentSection = 1

    const rawInfoTable = fund.funds?.infoTable
    let infoTable = []

    function parseRawInfo() {
        let infoByLine = rawInfoTable.split(/\r\n/)
        for (let i = 0; i < infoByLine.length; i++) {
            let info = infoByLine[i].trim()
            let infoByCol = info.split(":")
            if (infoByCol.length < 2) {
                continue;
            }
            let heading = infoByCol[0]
            let data = ""
            if (infoByCol.length > 2) {
                data = infoByCol.slice(1).join(":")
            } else {
                data = infoByCol[1].trim()
            }
            let row = [heading, data]
            infoTable.push(row)
        }
    }

    parseRawInfo()

    const rawData = processFundValues(fundValues, fund.funds.fundValueName)

    const pageContext = {
        title: fund.title,
        heading: fund.title,
        infoTable: infoTable,
        content: fund.content,
        factSheet: fund.funds?.factSheet,
        fileLibrary: null // fund.funds?.fileLibrary
    }

    const first = new Date(rawData[rawData.length - 1][0])
    const lastWeek = moment(first).subtract(7, 'days')
    const [chartStartDate, updateChartStartDate] = useState(lastWeek.toDate())

    function setChartStartDate(v) {
        updateChartStartDate(v)
    }

    const [chartEndDate, updateChartEndDate] = useState(new Date(rawData[rawData.length - 1][0]))

    function setChartEndDate(v) {
        updateChartEndDate(v)
    }

    function updateDataSelection() {
        const data = getDataPoints(chartStartDate, chartEndDate)
        setChartData(data[0])
        setTransformedChartData(data[1])

    }

    function getDataPoints(start, end) {
        let dataPoints = []
        let transform = []
        for (let i = 0; i < rawData.length; i++) {
            let d = new Date(`${rawData[i][0]} 0:0:0`)
            if (d >= start && d <= end) {
                dataPoints.push(
                    [rawData[i][0], rawData[i][1]]
                )
                transform.push(
                    {
                        name: rawData[i][0],
                        val: rawData[i][1]
                    }
                )
            }
        }

        return [dataPoints, transform]
    }

    const [chartData, updateChartData] = useState(getDataPoints(chartStartDate, chartEndDate)[0])

    function setChartData(v) {
        updateChartData(v)
    }

    const [transformedChartData, updateTransformedChartData] = useState(getDataPoints(chartStartDate, chartEndDate)[1])

    function setTransformedChartData(v) {
        updateTransformedChartData(v)
    }


    useEffect(() => {
        updateDataSelection()
    }, [chartStartDate, chartEndDate])


    return (
        <>
            <PageLayout title={pageContext.title} preview={false}>
                <PageTitle title={pageContext.heading}/>
                <div className="md:w-5/6 sm:w-full ml-auto mr-0 my-4 flex flex-wrap mx-auto overflow-hidden">
                    <div className="my-1 px-1 w-full overflow-hidden sm:w-full md:w-full lg:w-2/3">
                        <div className="page-text mb-3 page-text pr-3 mr-3"
                             dangerouslySetInnerHTML={{__html: pageContext.content}}/>


                    </div>
                    <div className="my-1 px-1 w-full overflow-hidden sm:w-full md:w-full lg:w-1/3">

                        <InfoTable data={infoTable}/>
                    </div>

                </div>


                <div className="flex flex-wrap -mx-2 overflow-hidden">

                    <div
                        className="my-2 p-2 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:p-4 btn-card">
                        <div
                            className="bg-white flex items-center hover:bg-gray-200 p-3">
                            <div className="w-1/4 mr-3 px-3">
                                <img src="/images/icons/finances.png" width="60%" height="60%"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">
                                    <FundTableButtonModal title="Historical Prices" chartData={chartData} btnText="Historical Prices" />
                                </h3>

                            </div>
                        </div>
                    </div>
                    <div
                        className="my-2 p-2 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:p-4 btn-card">
                        <div
                            className="bg-white flex items-center hover:bg-gray-200 p-3">
                            <div className="w-1/4 mr-3 px-3">
                                <img src="/images/icons/presentation.png" width="60%" height="60%"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">
                                    <a href={fund.funds?.factSheet?.sourceUrl}>
                                        Fact Sheet
                                    </a>
                                </h3>

                            </div>
                        </div>
                    </div>
                    <div
                        className="my-2 p-2 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:p-4 btn-card">
                        <div
                            className="bg-white flex items-center hover:bg-gray-200 p-3">
                            <div className="w-1/4 mr-3 px-3">
                                <img src="/images/icons/loudspeaker.png" width="60%" height="60%"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">
                                    <a href="/posts/archive">Announcements</a>
                                </h3>

                            </div>
                        </div>
                    </div>
                    <div
                        className="my-2 p-2 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 sm:p-4 btn-card">
                        <div
                            className="bg-white flex items-center hover:bg-gray-200 p-3">
                            <div className="w-1/4 mr-3 px-3">
                                <img src="/images/icons/safebox.png" width="60%" height="60%"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">
                                    <a href="/file-library">File Library</a>
                                </h3>

                            </div>
                        </div>
                    </div>


                </div>

                <DatePicker
                    onChange={e => setChartStartDate(e)}
                    value={chartStartDate}
                    format="yyyy-MM-dd"
                    minDate={new Date(rawData[0][0])}
                    maxDate={chartEndDate}
                />

                <DatePicker
                    onChange={e => setChartEndDate(e)}
                    value={chartEndDate}
                    format="yyyy-MM-dd"
                    minDate={chartStartDate}
                    maxDate={new Date(rawData[rawData.length - 1][0])}
                />

                <ResponsiveContainer width={'99%'} height={300}>
                    <LineChart
                        data={transformedChartData}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="val" stroke="#8884d8"/>
                    </LineChart>
                </ResponsiveContainer>

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
    const data = await getFund(params.id)
    const tickerData = await getFundValues(2)
    const fundValues = await getFundValues(null)
    return {
        props: {
            preview,
            fund: data,
            tickerData,
            fundValues
        },
    }
}
