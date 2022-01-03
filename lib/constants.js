export const EXAMPLE_PATH = 'cms-wordpress'
export const CMS_NAME = 'ALFM Mutual Funds'
export const CMS_URL = 'https://wordpress.org'

export const PAGE_URLS = {
    development: {
        home: {
            url: "/",
            cms_id: null,
            subnav: [
                { name: 'Investing 101', href: '/page/investment-basics', current: false },
                { name: "Fund Manager's Corner", href: '#', current: false },
                { name: 'FAQs', href: '#', current: false },
            ]
        },
        about: {
            url: "/about",
            cms_id: null,
            subnav: [
                { name: 'Board of Directors', href: '/page/cG9zdDo3', current: false },
            ]
        },
        funds: {
            alfm_money_market_fund: {
                url: "/funds/alfm-money-market-fund",
                cms_id: null
            }
        },
        frontpage: [
            {
                title: "Investment Basics",
                slug: "investment-basics",
                url: "/page/investment-basics",
                cms_id: "cG9zdDo3",
                excerpt: `A Mutual Fund is an open end investment company registered with the Securities andExchange Commission (SEC) in which the investible cash of numerous investors are pooled ina specific fund (\"fund\") with the aim of achieving a specific investment objective. The Fund isNOT a DEPOSIT product and is not an obligation of, or guaranteed, or insured by the FundManager, and is not insured by the Philippine Deposit Insurance Corporation (PDIC). Due to thenature of the investments, yield and potential yields cannot be guaranteed. Historical performance, when presented, is purely for reference purposes and is not a guarantee of future results.`
            }
        ]
    },
    production: {
        home: {
            url: "/",
            cms_id: null
        },
        about: {
            url: "/about",
            cms_id: null
        },
        funds: {
            alfm_money_market_fund: {
                url: "/funds/alfm-money-market-fund",
                cms_id: null
            }
        },
        frontpage: [
            {
                title: "Investment Basics",
                slug: "investment-basics",
                url: "/page/investment-basics",
                cms_id: "cG9zdDo3",
                excerpt: `A Mutual Fund is an open end investment company registered with the Securities andExchange Commission (SEC) in which the investible cash of numerous investors are pooled ina specific fund (\"fund\") with the aim of achieving a specific investment objective. The Fund isNOT a DEPOSIT product and is not an obligation of, or guaranteed, or insured by the FundManager, and is not insured by the Philippine Deposit Insurance Corporation (PDIC). Due to thenature of the investments, yield and potential yields cannot be guaranteed. Historical performance, when presented, is purely for reference purposes and is not a guarantee of future results.`
            }
        ]
    },
    staging: {
        home: {
            url: "/",
            cms_id: null
        },
        about: {
            url: "/about",
            cms_id: null
        },
        funds: {
            alfm_money_market_fund: {
                url: "/funds/alfm-money-market-fund",
                cms_id: null
            }
        },
        frontpage: [
            {
                title: "Investment Basics",
                slug: "investment-basics",
                url: "/page/investment-basics",
                cms_id: "cG9zdDo3",
                excerpt: `A Mutual Fund is an open end investment company registered with the Securities andExchange Commission (SEC) in which the investible cash of numerous investors are pooled ina specific fund (\"fund\") with the aim of achieving a specific investment objective. The Fund isNOT a DEPOSIT product and is not an obligation of, or guaranteed, or insured by the FundManager, and is not insured by the Philippine Deposit Insurance Corporation (PDIC). Due to thenature of the investments, yield and potential yields cannot be guaranteed. Historical performance, when presented, is purely for reference purposes and is not a guarantee of future results.`
            }
        ]
    }
}
