import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
    <div onDragStart={handleDragStart} role="presentation" className="flex flex-row  items-end space-x-4">
        <em>ALFM Money Market Fund</em>
        <div className="flex space-x-2">
            <strong>130.78</strong>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
        </div>
    </div>,
    <div onDragStart={handleDragStart} role="presentation" className="flex flex-row  items-end space-x-4">
        <em>ALFM Peso Bond Fund</em>
        <div className="flex space-x-2">
            <strong>130.78</strong>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
        </div>
    </div>,
    <div onDragStart={handleDragStart} role="presentation" className="flex flex-row  items-end space-x-4">
        <em>ALFM Growth Fund</em>
        <div className="flex space-x-2">
            <strong>130.78</strong>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
        </div>
    </div>,
    <div onDragStart={handleDragStart} role="presentation" className="flex flex-row  items-end space-x-4">
        <em>Philippine Stock Index Fund</em>
        <div className="flex space-x-2">
            <strong>130.78</strong>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
        </div>
    </div>,
    <div onDragStart={handleDragStart} role="presentation" className="flex flex-row  items-end space-x-4">
        <em>ALFM Dollar Bond Fund</em>
        <div className="flex space-x-2">
            <strong>130.78</strong>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
        </div>
    </div>,
    <div onDragStart={handleDragStart} role="presentation" className="flex flex-row  items-end space-x-4">
        <em>ALFM Euro Bond Fund</em>
        <div className="flex space-x-2">
            <strong>130.78</strong>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
        </div>
    </div>
];

const responsive = {
    0: {items: 1},
    1024: {items: 2},
    1200: {items: 3}
};

export default function Ticker() {

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
                infinite
                touchTracking={false}
                disableDotsControls
                disableButtonsControls
            />
        </>

    )
}

