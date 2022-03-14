import Footer from '../components/footer'
import Meta from '../components/meta'
import Head from "next/head";
import {CMS_NAME} from "../lib/constants";
import Container from "../components/container";
import Ticker from "../components/generic/ticker/ticker";
import MasterNavbar from "../components/generic/nav/master-nav";
import CookieConsent from "react-cookie-consent";

export default function PageLayout({preview, title, children, tickerData, theme, relatedSites}) {
    const env = process.env.ENV_ALIAS
    return (
        <>
            <Meta/>
            <Head>
                <title>{title} | {CMS_NAME}</title>
            </Head>
            <div className="min-h-screen">
                {env === "production" ? <noscript>
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJQ66LW"
                            height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe>
                </noscript> : <noscript>
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K3SCJ5M"
                            height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe>
                </noscript>}
                <MasterNavbar theme={theme} relatedSites={relatedSites}/>
                <Container>

                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <Ticker tickerData={tickerData}/>
                        <main>{children}</main>
                    </div>
                </Container>
            </div>
            <Footer/>
            <CookieConsent
                buttonStyle={{"background": "#a4d65e", "font-size": ".8rem", "color": "white"}}
            >
                <small>BPI uses cookies which help us know how you use our website. These cookies help us improve your browsing experience and how we serve you with content tailored to your interests. To continue using our website, you agree and accept our use of cookies.
                    <a href="/page/privacy-policy" className="ml-2 hover:text-white text-accent-1">Learn more</a></small>
            </CookieConsent>
        </>
    )
}
