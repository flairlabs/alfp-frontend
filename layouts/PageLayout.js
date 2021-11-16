import Footer from '../components/footer'
import Meta from '../components/meta'
import Head from "next/head";
import {CMS_NAME} from "../lib/constants";
import Container from "../components/container";
import Ticker from "../components/generic/ticker/ticker";
import MasterNavbar from "../components/generic/nav/master-nav";

export default function PageLayout({preview, title, children, tickerData, theme}) {
    return (
        <>
            <Meta/>
            <Head>
                <title>{title} | {CMS_NAME}</title>
            </Head>
            <div className="min-h-screen">
                <MasterNavbar theme={theme} />
                <Container>

                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <Ticker tickerData={tickerData}/>
                        <main>{children}</main>
                    </div>
                </Container>
            </div>
            <Footer/>
        </>
    )
}
