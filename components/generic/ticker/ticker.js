import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const fundKeys = {
    "alfmDollarBondFund": {
        name: "ALFM Dollar Bond Fund",
        url: "/funds/alfm-dollar-bond-fund"
    },
    "alfmEuroBondFund": {
        name: "ALFM Euro Bond Fund",
        url: "/funds/alfm-euro-bond-fund"
    },
    "alfmGlobalMultiAssetIncomeFund": {
        name: "ALFM Global Multi-Asset Income Fund (USD)",
        url: "/funds/alfm-global-muti-asset-income-fund"
    },
    "alfmGlobalMultiAssetIncomeFundPhp": {
        name: "ALFM Global Multi-Asset Income Fund (PHP)",
        url: "/funds/alfm-global-muti-asset-income-fund-php"
    },
    "alfmGrowthFund": {
        name: "ALFM Growth Fund",
        url: "/funds/alfm-growth-fund"
    },
    "alfmMoneyMarketFund": {
        name: "ALFM Money Market Fund",
        url: "/funds/alfm-money-market-fund"
    },
    "alfmPesoBondFund": {
        name: "ALFM Peso Bond Fund",
        url: "/funds/alfm-peso-bond-fund"
    },
    "alfmPhilippineStockIndexFund": {
        name: "Philippine Stock Index Fund",
        url: "/funds/philippine-stock-index-fund"
    },
    "alfmPhilippineStockIndexFundUnits": {
        name: "Philippine Stock Index Fund (Units)",
        url: "/funds/philippine-stock-index-fund-units"
    },
    "alfmRealEstateIncomeFund": {
        name: "ALFM Real Estate Income Fund",
        url: "/funds/alfm-real-estate-income-fund"
    }

}

let fundValues = [
    {
        name: "ALFM Money Market Fund",
        value: 130.75,
        date: "2021-10-10",
        trend: "down",
        url: "/funds/alfm-money-market-fund"
    },
    {
        name: "ALFM Peso Bond Fund",
        value: 130.75,
        date: "2021-10-10",
        trend: "up",
        url: "#!"
    },
    {
        name: "ALFM Growth Fund",
        value: 130.75,
        date: "2021-10-10",
        trend: "up",
        url: "#!"
    },
    {
        name: "Philippine Stock Index Fund",
        value: 130.75,
        date: "2021-10-10",
        trend: "down",
        url: "#!"
    },
    {
        name: "ALFM Dollar Bond Fund",
        value: 130.75,
        date: "2021-10-10",
        trend: "up",
        url: "#!"
    }
]

const responsive = {
    0: {items: 1},
    1024: {items: 1},
    1200: {items: 2}
};

const tempStyle = {
    "marginRight": "2px"
}

function parseTickerData(rawTickerData) {
    let parsedFundValues = []
    for (let i = 0; i < rawTickerData.length; i++) {

        let rtd = rawTickerData[i]
        let fundValueForDay = []
        for (let f in rtd.fundValueFields) {
            let parsedFundValue = {}
            for (let fk in fundKeys) {
                let value = null
                if(rtd.fundValueFields[f]){
                    value = rtd.fundValueFields[f]
                }
                if (f === fk && value) {
                    parsedFundValue = {
                        name: fundKeys[f].name,
                        value: value,
                        date: rtd.fundValueFields.date,
                        url: fundKeys[f].url
                    }
                    fundValueForDay.push(parsedFundValue)
                }
            }

        }
        parsedFundValues.push(fundValueForDay)
    }

    if (parsedFundValues.length > 0) {
        for (let i = 0; i < parsedFundValues[0].length; i++) {
            let currVal = parsedFundValues[0][i]?.value
            let prevVal = parsedFundValues[1][i]?.value
            if(prevVal){
                if (prevVal < currVal) {
                    parsedFundValues[0][i].trend = "up"
                } else {
                    parsedFundValues[0][i].trend = "down"
                }
            }else{
                parsedFundValues[0][i].trend = "up"
            }
        }


    }
    return parsedFundValues[0]
}

export default function Ticker(tickerData = []) {
    if (tickerData) {
        if (tickerData.tickerData?.length === 2) {
            fundValues = parseTickerData(tickerData.tickerData)
        }
    }

    let __items = []
    let items = []
    for (let i = 0; i < fundValues.length; i++) {
        let fund = fundValues[i]
        let icon = fund.trend === "up" ?
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-1" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12"/>
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6"/>
            </svg>

        let item = <div onDragStart={handleDragStart} role="presentation"
                        className="flex flex-row items-end space-x-4 items-center mt-1 mb-2 bg-accent-7 text-accent-2 p-3"
                        style={tempStyle}>
            <div className="w-4/5">
                <a className="block text-accent-1" href={fund.url}>{fund.name}</a>
                <small className="text-white">{fund.date}</small>
            </div>
            <div className="flex space-x-2 text-white">
                <strong>{fund.value}</strong>
                {icon}
            </div>
        </div>
        __items.push(item)
    }
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)
    items.push(...__items)

    return (
        <>
            <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
                autoPlay
                autoPlayControls={false}
                autoPlayStrategy="none"
                autoPlayInterval={3000}
                animationDuration={1000}
                animationType="fadeout"
                touchTracking={true}
                disableDotsControls
                disableButtonsControls
            />
        </>

    )
}

