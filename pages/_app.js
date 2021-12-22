import "../styles/globals.css"
import { StatusContext, useLogin } from "../hooks/use-stuff.js"
export default function Application({ Component, pageProps }) {
  const stuff = useLogin()
  return (
    <>
      <StatusContext.Provider value={stuff}>
        <Component {...pageProps} />
      </StatusContext.Provider>
    </>
  )
}
