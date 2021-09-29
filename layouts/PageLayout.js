import Footer from '../components/footer'
import Meta from '../components/meta'
import Head from "next/head";
import {CMS_NAME} from "../lib/constants";
import GenericNavbar from "../components/generic/nav/navbar";
import TopNav from "../components/generic/nav/topnav";
import Container from "../components/container";
import Ticker from "../components/generic/ticker/ticker";

export default function PageLayout({preview, title, children}) {
    return (
        <>
            <Meta/>
            <Head>
                <title>{title} | {CMS_NAME}</title>
            </Head>
            <div className="min-h-screen">
                <TopNav></TopNav>
                <Container>
                    <GenericNavbar></GenericNavbar>

                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <Ticker></Ticker>
                        <main>{children}</main>
                    </div>
                </Container>
            </div>
            <Footer/>
        </>
    )
}
