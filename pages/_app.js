import '../styles/global.css'
import 'tailwindcss/tailwind.css'

import { createClient, Provider } from 'urql'

const client = createClient({
    url: 'https://countries.trevorblades.com/',
})

export default function App({ Component, pageProps }) {
    return (
        <Provider value={client}>
            <Component {...pageProps} />
        </Provider>
    )
}
