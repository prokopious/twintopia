import useFetch from "../hooks/use-fetch"
import { useState } from "react"
import Link from "next/link"
import AdminNav from "../components/AdminNav"
import formatDate from "../utils/format-date"
export default function Home({ data }) {
  const [filtered, setFiltered] = useState(data)
  const [toggle, setToggle] = useState(true)

  const filter = e => {
    setFiltered(
      data.filter(n => {
        return JSON.stringify(n).search(e.target.value) != -1
      })
    )
  }

  const sortArray = () => {
    setFiltered(
      [...filtered].sort((a, b) => {
        return eval(`a.createdAt ${toggle ? ">" : "<"} b.createdAt ? -1 : 1`)
      })
    )
    setToggle(!toggle)
  }

  return (
    <>
      <AdminNav />
      {data && (
        <div id="grid">
          <h3 className="heading">All jobs</h3>
          <div id="in">
            <button id="b" onClick={sortArray}>
              {toggle ? "newest" : "oldest"}
            </button>
            <input
              type="text"
              placeholder="filter by keyword.."
              onChange={e => filter(e)}
            />
          </div>
          {filtered.map(item => (
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
        #b {
          margin-right: 5px;
          width: 70px;
        }
        #h44 {
          padding-left 20px;
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
        #in {
          padding-left: 20px;
          padding-top: 20px;
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

export async function getServerSideProps() {
  const res = await fetch(`https://radiant-oasis-73401.herokuapp.com/jobs`)
  const data = await res.json()
  return { props: { data } }
}
