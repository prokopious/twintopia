import AdminNav from "../components/AdminNav"

export default function Layout({ children }) {
  return (
    <>
      <div id="wrapper">
        <div id="layout">
          <AdminNav />
          {children}
        </div>
      </div>
      <style jsx>{`
        #layout {
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 0;
        }
        #wrapper {
          width: 100vw;
        }
        @media only screen and (max-width: 700px) {
          #layout {
          }
        }
      `}</style>
    </>
  )
}
