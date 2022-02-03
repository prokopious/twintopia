import { useState, useEffect, useRef } from "react"
import AdminNav from "../../components/AdminNav"
import axios from "axios"
import Link from "next/link"
import router from "next/router"
import { getStorageItem, setStorageItem } from "../../lib/storage.js"
import jwt_decode from "jwt-decode"
import PreviewWindow from "../../components/PreviewWindow"
import { useStatus } from "../../hooks/use-stuff"

export default function edit({ data }) {
  const store = getStorageItem("jobs")
  const { editJob, updateJob } = useStatus()
  const ref = useRef(null)

  const [title, setTitle] = useState(store ? store.details.title : data.title)
  const [company, setCompany] = useState(
    store ? store.details.company : data.company
  )
  const [body, setBody] = useState(store ? store.details.notes : data.notes)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("token")
      setToken(token)
    }
  }, [setToken])



  useEffect(() => {
    const update = {
      details: {
        notes: body,
        title: title,
        company: company,
      },
    }
    updateJob(update)
  }, [body, title, company])

  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("token")
      let decoded
      if (!token) {
        router.push("./login")
      } else if (token) {
        try {
          decoded = jwt_decode(token)
        } catch (error) {
          router.push("./login")
        }
        if (Date.now() < decoded.exp * 1000) {
          return
        } else if (Date.now() >= decoded.exp * 1000) {
          router.push("./login")
        } else {
          router.push("./login")
        }
      }
    }
  }, [])

  const clearStorage = () => {
    setBody(data.notes)
    setTitle(data.title)
    setCompany(data.company)
    if (typeof window !== "undefined") {
      window.location.reload(false)
    }
  }

  function refreshPage() {
    if (typeof window !== undefined) {
      window.location.reload(false)
    }
  }

  const del = () => {
    axios
      .delete(`https://radiant-oasis-73401.herokuapp.com/jobs/${data._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        console.log(res)
        setTitle("")
        setBody("")
        setCompany("")
        setLoading(false)
      })
      .then(router.push("/create"))

      .catch(err => {
        console.log(err)
        setLoading(false)
        if (err.response.status == 401) {
          ref.current.textContent = "You are not logged in."
          router.push("./login")
        } else if (err.response.status == 500) {
          console.log(err.response)
          ref.current.textContent = Object.keys(err.response.data.errors)
            .map(key => {
              return err.response.data.errors[key].message
            })
            .join("\n")
        } else {
          setIsError(err.message)
        }
      })
  }
  const handleSubmit = () => {
    setLoading(true)
    setIsError(false)
    const details = {
      title: title,
      notes: body,
      company: company,
    }
    axios
      .put(
        `https://radiant-oasis-73401.herokuapp.com/jobs/${data._id}`,
        details,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        console.log(res)
        setTitle("")
        setBody("")
        setCompany("")
        setLoading(false)
      })
      .then(refreshPage())
      .catch(err => {
        console.log(err)
        setLoading(false)
        if (err.response.status == 401) {
          ref.current.textContent = "You are not logged in."
          router.push("./login")
        } else if (err.response.status == 500) {
          console.log(err.response)
          ref.current.textContent = Object.keys(err.response.data.errors)
            .map(key => {
              return err.response.data.errors[key].message
            })
            .join("\n")
        } else {
          setIsError(err.message)
        }
      })
  }
  if (typeof data !== "undefined") {
    return (
      <>
        <AdminNav />
        <div id="frame">
          <h5 id="h">Edit Job</h5>
          <button onClick={clearStorage}>reset</button>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="title"
              className="paragraph"
              placeholder="Title.."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="company"
              className="paragraph"
              placeholder="Company.."
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              spellCheck="true"
              className="form-control"
              id="body"
              className="paragraph2"
              placeholder="Body.."
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </div>
          {isError && (
            <small className="mt-3 d-inline-block text-danger"></small>
          )}
          <button
            id="buttt"
            type="submit"
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
          <div id="string" ref={ref}></div>
          <div id="li">
            <Link href={`/jobs`}>
              <a>see all jobs</a>
            </Link>
          </div>
          <div id="li">
            <button id="buttt2" onClick={del}>
              Delete from database
            </button>
          </div>
        </div>

        <style jsx>{`
          #frame {
            padding: 20px;
            align-items: center;
          }
          #h {
            margin-top: 0;
            padding-top: 0px;
            padding-bottom: 0px;
            color: #3a3a3a;
            font-size: 24px;
            font-weight: 500;
          }
          .paragraph {
            width: 500px;
            margin-bottom: 5px;
            height: 35px;
            border-radius: 3px;
            border: transparent;
            box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
              5px 5px 12px rgba(49, 49, 49, 0.164);
            padding-left: 5px;
          }
          #string {
            white-space: pre-wrap;
            padding-top: 15px;
          }
          #buttt {
            background-color: rgb(255, 255, 255);
            padding: 5px 10px;
            border: transparent;
            box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
              5px 5px 12px rgba(49, 49, 49, 0.164);
            width: 70px;
            vertical-align: middle;
          }
          #buttt2 {
            background-color: rgb(255, 255, 255);
            padding: 5px 10px;
            border: transparent;
            margin-top: 20px;
            box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
              5px 5px 12px rgba(49, 49, 49, 0.164);
            background-color: red;
            vertical-align: middle;
          }
          .paragraph2 {
            width: 500px;
            margin-top: 2px;
            height: 200px;
            border-radius: 3px;
            color: #3a3a3a;
            border: transparent;
            padding: 5px;
            box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
              5px 5px 12px rgba(49, 49, 49, 0.164);
          }
        `}</style>
      </>
    )
  } else {
    return <></>
  }
}
export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://radiant-oasis-73401.herokuapp.com/jobs/${params._id}`
  )
  const data = await res.json()
  return { props: { data } }
}
