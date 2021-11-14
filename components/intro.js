import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

export default function Intro({carouselItems}) {
    let items = []
    for(let i = 0; i < carouselItems.length; i++){
        items.push(
            <a href={carouselItems[i]?.mainCarouselItem?.url}>
                <img src={carouselItems[i]?.featuredImage?.node?.sourceUrl} onDragStart={handleDragStart} role="presentation" />
            </a>
        )
    }
    // console.log(carouselItems)
    return (
        <>
            <AliceCarousel mouseTracking items={items}/>
        </>

    )
}
