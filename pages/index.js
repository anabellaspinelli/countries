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
                <title className='font-black'>{siteTitle}</title>
            </Head>
            <section className='container my-0 mx-auto'>
                <div className='flex flex-wrap p-1 bg-blue-50 sm:rounded-3xl'>
                    {data.countries.map((country) => (
                        <Link
                            href={`/countries/${generateCountrySlug(country)}`}
                        >
                            <div
                                className='transition-all cursor-pointer flex-auto bg-white shadow-lg sm:rounded-3xl sm:p-20 m-1 hover:bg-yellow-50'
                                key={country.code}
                            >
                                <h2 className='text-xl font-medium'>
                                    {country.name}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
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
