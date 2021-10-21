import '../styles/index.css'
import 'tailwindcss/tailwind.css'
import {useState} from "react";
import GlobalContext from "../lib/global-context";

const Bugsnag = require('@bugsnag/js')

// Bugsnag.start({ apiKey: '950061133432fe93f797e48f5d33b760' })

function MyApp({Component, pageProps}) {
    const [state, setState] = useState({
        currentSection: 0,
        update
    })

    function update(data) {
        setState(Object.assign({}, state, data));
    }

    return <GlobalContext.Provider value={state}>
        <Component {...pageProps} />
    </GlobalContext.Provider>
}

export default MyApp
