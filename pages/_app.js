import '../styles/index.css'
import 'tailwindcss/tailwind.css'
const Bugsnag = require('@bugsnag/js')
Bugsnag.start({ apiKey: '950061133432fe93f797e48f5d33b760' })

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
