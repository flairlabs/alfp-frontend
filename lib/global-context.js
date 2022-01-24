import React from 'react';

const GlobalContext = React.createContext({
    currentSection: 0,
    relatedSitesMenu: [],
    tickerData: [],
    update: (data) => {}
})

export default GlobalContext
