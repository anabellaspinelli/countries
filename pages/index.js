import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

import { withUrqlClient } from 'next-urql'
import { useQuery } from 'urql'
import Link from 'next/link'
import { generateCountrySlug } from '../lib/utils'

function Home({ allPostsData }) {
    const [result, rerunQuery] = useQuery({
        query: `query {
            countries {
                name
                code
            }
        }`,
    })

    const { fetching, error, data } = result

    if (fetching) return <p>Loading...</p>
    if (error) return <p>Oh no! {result.error.message}</p>

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                {data.countries.map((country) => (
                    <div key={country.code}>
                        <Link
                            href={`/countries/${generateCountrySlug(country)}`}
                        >
                            <a>{country.name}</a>
                        </Link>
                    </div>
                ))}
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData,
        },
    }
}

export default withUrqlClient(() => ({
    url: 'https://countries.trevorblades.com/',
}))(Home)
