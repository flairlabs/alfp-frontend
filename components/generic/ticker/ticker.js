import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const fundValues = [
    {
        name: "ALFM Money Market Fund",
        value: 130.75,
        date: "2021-10-10",
        trend: "down" ,
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
    1024: {items: 2},
    1200: {items: 3}
};

export default function Ticker() {

    let items = []
    for(let i = 0; i < fundValues.length; i++){
        let fund = fundValues[i]
        let icon = fund.trend === "up" ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
        </svg>

        let item = <div onDragStart={handleDragStart} role="presentation" className="flex flex-row items-end space-x-4 items-center mt-1 mb-2 bg-accent-7 text-accent-2 p-3 mx-2">
            <div className="w-2/3">
                <a className="block text-accent-1" href={fund.url}>{fund.name}</a>
                <small>{fund.date}</small>
            </div>
            <div className="flex space-x-2">
                <strong>{fund.value}</strong>
                {icon}
            </div>
        </div>
        items.push(item)
    }

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
                animationType="slide"
                infinite
                touchTracking={false}
                disableDotsControls
                disableButtonsControls
            />
        </>

    )
}

