import { useState, useEffect, useRef } from "react"
import AdminNav from "../components/AdminNav"
import axios from "axios"
import Dropdown from "../components/Dropdown"
import DropdownList from "../components/DropdownList"
import Link from 'next/link'
import router from "next/router"
import jwt_decode from "jwt-decode"

export default function create() {
  const ref = useRef(null)
  const [company, setCompany] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [jobUrl, setJobUrl] = useState("")
  const [companyUrl, setCompanyUrl] = useState("")
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
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("token")
      let decoded
      if (!token) {
        router.push("./login")
      } else if (token) {
        try {
          decoded = jwt_decode(token)
          if (Date.now() < decoded.exp * 1000) {
            return
          } else if (Date.now() >= decoded.exp * 1000) {
            router.push("./login")
          } else {
            router.push("./login")
          }
        } catch (error) {
          router.push("./login")
        }
      }
    }
  }, [])
  function refreshPage() {
    if (typeof window !== undefined) {
      window.location.reload(false)
    }
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
      .post("https://radiant-oasis-73401.herokuapp.com/jobs", details, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setTitle("")
        setBody("")
        setCompany("")
        setJobUrl("")
        setCompanyUrl("")
        setLoading(false)
      })
      .then(refreshPage())
      .catch(err => {
        setLoading(false)
        if (err.response.status == 401) {
          ref.current.textContent = "You are not logged in."
          router.push("./login")
        } else if (err.response.status == 500) {
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

  return (
    <>
      <AdminNav />
      <Dropdown markdown={body} />
      <DropdownList />
      <div id="frame">
        <div id="h">Create A Job</div>
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
          <input
            type="text"
            className="form-control"
            id="jobUrl"
            className="paragraph"
            placeholder="Job URL.."
            value={jobUrl}
            onChange={e => setJobUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="companyUrl"
            className="paragraph"
            placeholder="Company URL.."
            value={companyUrl}
            onChange={e => setCompanyUrl(e.target.value)}
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
        {isError && <small className="mt-3 d-inline-block text-danger"></small>}
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
        <div id="li"><Link href={`/jobs`}>
      <a>see all jobs</a>
    </Link></div>
      </div>

      <style jsx>{`
        #frame {
          padding: 15px;
          align-items: center;
        }
        #h {
          margin-top: 4px;
          padding-top: 0px;
          margin-bottom: 10px;
          color: #3a3a3a;
          font-size: 18x;
          font-weight: 500;
        }
        .paragraph {
          width: 700px;
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
        .paragraph2 {
          width: 700px;
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
}
