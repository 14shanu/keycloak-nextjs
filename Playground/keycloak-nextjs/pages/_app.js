import '../styles/globals.css'
import React from 'react'
import cookie from 'cookie'
import {IncomingMessage} from 'http'
import {AppContext ,AppProps} from 'next/app'
import {SSRKeycloakProvider , SSRCookies} from  '@react-keycloak/ssr'
const keycloakCfg = {
  url: 'http://localhost:8080/auth',
  realm: 'test',
  clientId: 'client-react'
}
 
function MyApp({ Component, pageProps, cookies }) {
  return (
    <SSRKeycloakProvider
    keycloakConfig={keycloakCfg}
    persistor={SSRCookies(cookies)}
  >
  <Component {...pageProps} />
  </SSRKeycloakProvider>
  )
}

function parseCookies(req) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}


MyApp.getInitialProps = async (context) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req)
  }
}
export default MyApp
