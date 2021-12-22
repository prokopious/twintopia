import Navbar from "./Navbar"

export default function Layout({ children }) {
  return (
    <>
      <div id="layout">{children}</div>
      <style jsx>{`
        #layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
        }
        @media only screen and (max-width: 700px) {
          #layout {
            display: grid;
            grid-template-columns: 1fr;
        
          }
        }
      `}</style>
    </>
  )
}
