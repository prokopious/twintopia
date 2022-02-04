import useFetch from "../hooks/use-fetch"
import Link from "next/link"
import AdminNav from "../components/AdminNav"
import formatDate from "../utils/format-date"
export default function Home() {
  const { data, loading, error } = useFetch(
    "https://radiant-oasis-73401.herokuapp.com/jobs"
  )

  return (
    <>
      <AdminNav />
      {loading && <>loading...</>}
      {error && <>there was an error...</>}
      {data && (
        <div id="grid">
          {data.map(item => (
            <div id={data.indexOf(item) % 2 === 0 ? "evenBox" : "oddBox"}>
                <div className="date">{formatDate(item.createdAt)}</div>
              <div className="title">{item.title}</div>
              <div className="company">{item.company}</div>
              <p className="notes">{item.notes}</p>
              <div className="u">
                  <a href={item.companyUrl}>{item.companyUrl}</a>
                </div>
                <div className="u">
                  <a href={item.jobUrl}>{item.jobUrl}</a>
                </div>
            
        

              <div className="edit">
                <Link href={`/editjob/${item._id}`}>
                  <a>edit job</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
      #evenBox {
          padding: 20px;
        }
     #grid {
       max-width: 960px;
     }
        #oddBox {
          padding: 20px;
        }
        .email {
          margin-top: 5px;
        }
        
        .notes {
          padding-top: 10px;
          padding-bottom: 10px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
