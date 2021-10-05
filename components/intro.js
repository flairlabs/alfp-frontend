import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Ticker from "./generic/ticker/ticker";

const handleDragStart = (e) => e.preventDefault();

const items = [
    <img src="/images/splash-01.png" onDragStart={handleDragStart} role="presentation" />,
    <img src="/images/factors.png" onDragStart={handleDragStart} role="presentation" />,
    <img src="/images/finance.png" onDragStart={handleDragStart} role="presentation" />,
    <img src="/images/investing.png" onDragStart={handleDragStart} role="presentation" />,
    <img src="/images/revenue.png" onDragStart={handleDragStart} role="presentation" />,
    <img src="/images/wallet.png" onDragStart={handleDragStart} role="presentation" />,
];

export default function Intro() {

  return (
      <>
          <AliceCarousel mouseTracking items={items} />
      </>

  )
}
