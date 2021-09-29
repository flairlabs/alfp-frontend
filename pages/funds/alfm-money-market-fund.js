import PageLayout from "../../layouts/PageLayout";
import PageTitle from "../../components/generic/titles/page-title";
import {useState, useEffect} from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import PageText from "../../components/generic/page/page-text";
import FundTable from "../../components/generic/tables/fund-table";
import moment from "moment";
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from "recharts";

export default function Dummy() {
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
        title: "ALFM Money Market Fund",
        heading: "ALFM Money Market Fund",
        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque dignissim enim sit amet. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Purus ut faucibus pulvinar elementum integer enim. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Aliquet lectus proin nibh nisl condimentum id venenatis a. Cursus vitae congue mauris rhoncus aenean vel. Quis hendrerit dolor magna eget. Ut venenatis tellus in metus vulputate eu scelerisque felis. Neque convallis a cras semper auctor. Quis viverra nibh cras pulvinar mattis. Feugiat nibh sed pulvinar proin gravida hendrerit. Duis tristique sollicitudin nibh sit amet commodo nulla. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Condimentum mattis pellentesque id nibh tortor id.</p><p>Laoreet non curabitur gravida arcu ac tortor. Vitae aliquet nec ullamcorper sit amet risus nullam eget. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Vestibulum lectus mauris ultrices eros. Senectus et netus et malesuada fames ac turpis egestas sed. Praesent tristique magna sit amet purus. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Consequat mauris nunc congue nisi vitae. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Senectus et netus et malesuada fames ac turpis egestas maecenas. Lacus sed viverra tellus in hac habitasse platea dictumst. Pharetra vel turpis nunc eget lorem dolor.</p>",
        video: null
    }

    const [chartData, updateChartData] = useState(getDataPoints(chartStartDate, chartEndDate)[0])

    function setChartData(v) {
        updateChartData(v)
        console.log(v)
    }

    const [transformedChartData, updateTransformedChartData] = useState(getDataPoints(chartStartDate, chartEndDate)[1])

    function setTransformedChartData(v) {
        updateTransformedChartData(v)
        console.log(v)
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


    useEffect(() => {
        updateDataSelection()
    }, [chartStartDate, chartEndDate])


    return (
        <>
            <PageLayout title={pageContext.title} preview={false}>
                <PageTitle title={pageContext.heading}/>


                <div className="flex flex-wrap -mx-3 overflow-hidden sm:-mx-3 md:-mx-3 lg:-mx-3 xl:-mx-3">

                    <div
                        className="my-3 px-3 w-full overflow-hidden sm:my-3 sm:px-3 sm:w-full md:my-3 md:px-3 md:w-full lg:my-3 lg:px-3 lg:w-1/2 xl:my-3 xl:px-3 xl:w-1/2">
                        <div className="page-text mb-3" dangerouslySetInnerHTML={{__html: pageContext.content}}/>
                    </div>
                    <div
                        className="my-3 px-3 w-full overflow-hidden sm:my-3 sm:px-3 sm:w-full md:my-3 md:px-3 md:w-full lg:my-3 lg:px-3 lg:w-1/2 xl:my-3 xl:px-3 xl:w-1/2">

                        <div className="flex flex-wrap -mx-1 overflow-hidden">

                            <div className="my-1 px-1 w-full overflow-hidden">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/hDz4X3LEY0g"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                />


                                <div className="my-1 px-1 w-full overflow-hidden">
                                    <FundTable chartData={chartData}/>
                                </div>

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

                <LineChart
                    width={730}
                    height={250}
                    data={transformedChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="val" stroke="#8884d8" />
                </LineChart>

            </PageLayout>
        </>
    )
}
