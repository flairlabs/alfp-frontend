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
import {getFund} from "../../lib/api";

export default function Fund({fund = null}) {
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

    const rawData = [
        ["2021-08-13", 159.33],
        ["2021-08-14", 546.60],
        ["2021-08-15", 309.95],
        ["2021-08-16", 316.10],
        ["2021-08-17", 663.81],
        ["2021-08-18", 221.98],
        ["2021-08-19", 446.52],
        ["2021-08-20", 220.82],
        ["2021-08-21", 271.58],
        ["2021-08-22", 131.92],
        ["2021-08-23", 514.55],
        ["2021-08-24", 270.82],
        ["2021-08-25", 270.92],
        ["2021-08-26", 262.30],
        ["2021-08-27", 640.13],
        ["2021-08-28", 243.61],
        ["2021-08-29", 427.20],
        ["2021-08-30", 720.60],
        ["2021-08-31", 172.24],
        ["2021-09-01", 409.41],
        ["2021-09-02", 585.24],
        ["2021-09-03", 563.47],
        ["2021-09-04", 556.35],
        ["2021-09-05", 626.28],
        ["2021-09-06", 531.43],
        ["2021-09-07", 627.25],
        ["2021-09-08", 308.12],
        ["2021-09-09", 244.80],
        ["2021-09-10", 162.43],
        ["2021-09-11", 245.43],
        ["2021-09-12", 438.21],
        ["2021-09-13", 224.22],
        ["2021-09-14", 448.87],
        ["2021-09-15", 381.78],
        ["2021-09-16", 217.12],
        ["2021-09-17", 172.38],
        ["2021-09-18", 534.49],
        ["2021-09-19", 683.68],
        ["2021-09-20", 436.89],
        ["2021-09-21", 689.08],
        ["2021-09-22", 136.51],
        ["2021-09-23", 622.71],
        ["2021-09-24", 708.43],
        ["2021-09-25", 712.27],
        ["2021-09-26", 196.85],
        ["2021-09-27", 716.06],
        ["2021-09-28", 661.13],
        ["2021-09-29", 206.85],
        ["2021-09-30", 511.41],
        ["2021-10-01", 296.00]
    ]

    const pageContext = {
        title: fund.title,
        heading: fund.title,
        infoTable: infoTable,
        content: fund.content,
        video: null
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
                <div className="md:w-5/6 sm:w-full mx-auto my-4 flex flex-wrap mx-auto overflow-hidden">
                    <div className="my-1 px-1 w-full overflow-hidden sm:w-full md:w-full lg:w-2/3">
                        <div className="page-text mb-3 page-text" dangerouslySetInnerHTML={{__html: pageContext.content}}/>


                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/hDz4X3LEY0g"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                        />
                    </div>
                    <div className="my-1 px-1 w-full overflow-hidden sm:w-full md:w-full lg:w-1/3">
                        <InfoTable data={infoTable}/>
                    </div>

                </div>



                <div className="flex flex-wrap overflow-hidden">

                    <div
                        className="bg-accent-1 p-4 mb-4 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/4 lg:my-3 lg:px-3 lg:w-1/4 xl:my-4 xl:px-4 xl:w-1/4">
                        Historical Prices
                    </div>

                    <div
                        className="bg-accent-1 p-4 mb-4 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/4 lg:my-3 lg:px-3 lg:w-1/4 xl:my-4 xl:px-4 xl:w-1/4">
                        Fund Fact Sheets
                    </div>

                    <div
                        className="bg-accent-1 p-4 mb-4 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/4 lg:my-3 lg:px-3 lg:w-1/4 xl:my-4 xl:px-4 xl:w-1/4">
                        Announcements
                    </div>

                    <div
                        className="bg-accent-1 p-4 mb-4 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/4 lg:my-3 lg:px-3 lg:w-1/4 xl:my-4 xl:px-4 xl:w-1/4">
                        File Library
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
    return {
        props: {
            preview,
            fund: data
        },
    }
}
