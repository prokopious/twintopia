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
  const store = getStorageItem("recruiters")
  const { editRecruiter, updateRecruiter } = useStatus()
  const ref = useRef(null)

  const [name, setName] = useState(store ? store.details.name : data.name)
  const [company, setCompany] = useState(
    store ? store.details.company : data.company
  )
  const [body, setBody] = useState(store ? store.details.notes : data.notes)
  const [personalUrl, setPersonalUrl] = useState(store ? store.details.personalUrl : data.personalUrl)
  const [phone, setPhone] = useState(store ? store.details.phone : data.phone)
    const [companyUrl, setCompanyUrl] = useState(store ? store.details.companyUrl : data.companyUrl)
  const [email, setEmail] = useState(store ? store.details.email : data.email)
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
        name: name,
        company: company,
        companyUrl: companyUrl,
        personalUrl: personalUrl,
        phone: phone,
        email: email,
      },
    }
    updateRecruiter(update)
  }, [body, name, email, phone, company, companyUrl, personalUrl])

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
    setName(data.name)
    setPersonalUrl(data.personalUrl)
    setCompanyUrl(data.companyUrl)
    setCompany(data.company)
    setPhone(data.phone)
    setEmail(data.email)
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
      .delete(`https://radiant-oasis-73401.herokuapp.com/recruiters/${data._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        console.log(res)
        setName("")
        setEmail("")
        setPhone("")
        setBody("")
        setCompanyUrl('')
        setPersonalUrl("")
        setCompany("")
        setLoading(false)
      })
      .then(router.push("/recruiters"))

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
      name: name,
      notes: body,
      company: company,
      email: email,
      companyUrl: companyUrl,
      personalUrl: personalUrl,
      phone: phone,
    }
    axios
      .put(
        `https://radiant-oasis-73401.herokuapp.com/recruiters/${data._id}`,
        details,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        console.log(res)
        setName("")
        setBody("")
        setCompany("")
        setPhone("")
        setCompanyUrl("")
        setPersonalUrl('')
        setEmail("")
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
          <h5 id="h">Edit Recruiter</h5>
          <button onClick={clearStorage}>reset</button>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              className="paragraph"
              placeholder="Name.."
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="phone"
              className="paragraph"
              placeholder="Phone.."
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              className="paragraph"
              placeholder="Email.."
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="personalUrl"
              className="paragraph"
              placeholder="PersonalUrl.."
              value={personalUrl}
              onChange={e => setPersonalUrl(e.target.value)}
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
            <Link href={`/recruiters`}>
              <a>see all recruiters</a>
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
    `https://radiant-oasis-73401.herokuapp.com/recruiters/${params._id}`
  )
  const data = await res.json()
  return { props: { data } }
}
