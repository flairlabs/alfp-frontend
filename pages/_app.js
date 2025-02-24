import '../styles/index.css'
import 'tailwindcss/tailwind.css'
import {useState} from "react";
import GlobalContext from "../lib/global-context";
import {getRelatedSitesMenu} from "../lib/api";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';


const Bugsnag = require('@bugsnag/js')

Bugsnag.start({ apiKey: '950061133432fe93f797e48f5d33b760' })

export default function MyApp({Component, pageProps}) {
    const router = useRouter();

    useEffect(() => {
        // Initialize Fathom when the app loads
        // Example: yourdomain.com
        //  - Do not include https://
        //  - This must be an exact match of your domain.
        //  - If you're using www. for your domain, make sure you include that here.
        Fathom.load('QRNFOKRN', {
          includedDomains: ['localhost:3000', 'alfmmutualfunds.com', 'alfm-frontend-staging.magpie.tech'],
        });
    
        function onRouteChangeComplete() {
          Fathom.trackPageview();
        }
        // Record a pageview when route changes
        router.events.on('routeChangeComplete', onRouteChangeComplete);
    
        // Unassign event listener
        return () => {
          router.events.off('routeChangeComplete', onRouteChangeComplete);
        };
      }, []);
    
    /* Bugsnag */

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

