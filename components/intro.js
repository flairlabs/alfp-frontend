import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

// const items = [
//     <img src="/images/splash-01.png" onDragStart={handleDragStart} role="presentation"/>,
//     <img src="/images/factors.png" onDragStart={handleDragStart} role="presentation"/>,
//     <img src="/images/finance.png" onDragStart={handleDragStart} role="presentation"/>,
//     <img src="/images/investing.png" onDragStart={handleDragStart} role="presentation"/>,
//     <img src="/images/revenue.png" onDragStart={handleDragStart} role="presentation"/>,
//     <img src="/images/wallet.png" onDragStart={handleDragStart} role="presentation"/>,
// ];

export default function Intro({carouselItems}) {
    let items = []
    for(let i = 0; i < carouselItems.length; i++){
        items.push(
            <a href={carouselItems[i].mainCarouselItem?.url}>
                <img src={carouselItems[i].featuredImage?.node?.sourceUrl} onDragStart={handleDragStart} role="presentation" />
            </a>
        )
    }
    return (
        <>
            <AliceCarousel mouseTracking items={items}/>
        </>

    )
}
