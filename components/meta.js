import Head from 'next/head'


export default function Meta() {
    const gtag = "/staging/gtag.js"

    return (
        <Head>
                <script src={gtag}></script>

            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/alfm-logo.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/alfm-logo.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/alfm-logo.png"
            />
            <link rel="manifest" href="/favicon/site.webmanifest"/>
            <link
                rel="mask-icon"
                href="/favicon/safari-pinned-tab.svg"
                color="#000000"
            />
            <link rel="shortcut icon" href="/alfm-logo.png"/>
            <meta name="msapplication-TileColor" content="#000000"/>
            <meta name="msapplication-config" content="/favicon/browserconfig.xml"/>
            <meta name="theme-color" content="#000"/>
            <link rel="alternate" type="application/rss+xml" href="/feed.xml"/>

            <meta property="og:image" content="/alfm-logo.png"/>

            <script src="/phishing-beacon.js"></script>
        </Head>
    )
}
