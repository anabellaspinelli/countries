import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

import { createClient } from 'urql'
import { generateCountrySlug } from '../../lib/utils'

export default function Post({ country }) {
    return (
        <Layout>
            <Head>
                <title>country</title>
            </Head>
            <article>
                <pre>{JSON.stringify(country, null, 4)}</pre>
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const COUNTRIES_QUERY = `query {
            countries {
                name
                code
            }
        }`

    const client = createClient({
        url: 'https://countries.trevorblades.com/',
    })

    const response = await client.query(COUNTRIES_QUERY).toPromise()

    const countryPaths = response.data.countries.map((country) => ({
        params: {
            name: generateCountrySlug(country),
        },
    }))

    return {
        paths: countryPaths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const COUNTRY_QUERY = `
        query Country($code: ID!) {
            country(code: $code) {
                name
                code
                native
                phone
                continent {
                  name
                }
                capital
                currency
                languages {
                  name
                }
                emoji
                states {
                  name
                }
            }
        }   
    `

    const countryCode = params.name.split('-')[0]

    const client = createClient({
        url: 'https://countries.trevorblades.com/',
    })

    const { data, error } = await client
        .query(COUNTRY_QUERY, { code: countryCode })
        .toPromise()

    return {
        props: {
            country: data.country,
        },
    }
}
