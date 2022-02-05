import AdminNav from "../components/AdminNav"
import formatDate from "../utils/format-date"
import { useState } from "react"
import Link from "next/link"

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
        return eval(
          `b.createdAt ${toggle ? ">" : "<"} a.createdAt ? -1 : 1`
        )
      })
    )
    setToggle(!toggle)
  }

  return (
    <>
      <AdminNav />
      {data && (
        <div id="grid">
          <h3 className="heading">All recruiters</h3>
          <div id="in">
            <button id="b" onClick={sortArray}>
              {toggle ? "oldest" : "newest"}
            </button>
            <input
              type="text"
              placeholder="filter by keyword.."
              onChange={e => filter(e)}
            />
          </div>
          {filtered.map(item => (
            <div id={filtered.indexOf(item) % 2 === 0 ? "evenBox" : "oddBox"}>
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
          ))}
        </div>
      )}
      <style jsx>{`
        #b {
          margin-right: 5px;
          width: 70px;
        }
        #evenBox {
          padding: 20px;
        }
        #oddBox {
          padding: 20px;
        }
        #in {
          padding-left: 20px;
          padding-top: 20px;
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

export async function getServerSideProps() {
  const res = await fetch(
    `https://radiant-oasis-73401.herokuapp.com/recruiters`
  )
  const data = await res.json()
  return { props: { data } }
}
