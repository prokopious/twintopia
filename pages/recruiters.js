import useFetch from "../hooks/use-fetch"
import AdminNav from "../components/AdminNav"
import formatDate from "../utils/format-date"
import Link from "next/link"
export default function Home() {
  const { data, loading, error } = useFetch(
    "https://radiant-oasis-73401.herokuapp.com/recruiters"
  )
  return (
    <>
      <AdminNav />
      {loading && <>loading...</>}
      {error && <>there was an error...</>}
      {data && (
        <div>
          {data.map(item => (
            <>
              <div id={data.indexOf(item) % 2 === 0 ? "evenBox" : "oddBox"}>
                <div className="date">{formatDate(item.createdAt)}</div>
                <div className="name">{item.name}</div>
                <div className="company">{item.company}</div>
                <div className="email">{item.email}</div>
                <div className="phone">{item.phone}</div>
                <div className="u">
                  <a href={item.companyUrl}>{item.companyUrl}</a>
                </div>
                <div className="u">
                  <a href={item.personalUrl}>{item.personalUrl}</a>
                </div>
                <p className="notes">{item.notes}</p>
                <div className="edit">
                  <Link href={`/editrecruiter/${item._id}`}>
                    <a>edit recruiter</a>
                  </Link>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
      <style jsx>{`
        #evenBox {
          padding: 20px;
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
