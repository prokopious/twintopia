import Navbar from "./Navbar"

export default function Layout({ children }) {
  return (
    <>
      <div id="layout">
        <div id="stick">
          <Navbar />
        </div>
        {children}
      </div>
      <style jsx>{`
    
        #layout {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 2fr;
        }
        @media only screen and (max-width: 700px) {
          #layout {
            margin: 0;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
