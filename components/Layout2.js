import AdminNav from "../components/AdminNav"

export default function Layout({ children }) {
  return (
    <>
      <div id="layout">
        <AdminNav />
        {children}
      </div>
      <style jsx>{`
        #layout {
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 0;
        }
        @media only screen and (max-width: 700px) {
          #layout {
          }
        }
      `}</style>
    </>
  )
}
