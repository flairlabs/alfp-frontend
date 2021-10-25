import React from 'react';

const GlobalContext = React.createContext({
    currentSection: 0,
    tickerData: [],
    update: (data) => {}
})

export default GlobalContext
