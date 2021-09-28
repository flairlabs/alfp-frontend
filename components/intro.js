import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Ticker from "./generic/ticker/ticker";

const handleDragStart = (e) => e.preventDefault();

const items = [
    <img src="/static/splash-01.png" onDragStart={handleDragStart} role="presentation" />,
    <img src="/static/factors.png" onDragStart={handleDragStart} role="presentation" />,
    <img src="/static/finance.png" onDragStart={handleDragStart} role="presentation" />,
    <img src="/static/investing.png" onDragStart={handleDragStart} role="presentation" />,
    <img src="/static/revenue.png" onDragStart={handleDragStart} role="presentation" />,
    <img src="/static/wallet.png" onDragStart={handleDragStart} role="presentation" />,
];

export default function Intro() {

  return (
      <>
          <AliceCarousel mouseTracking items={items} />
      </>

  )
}
