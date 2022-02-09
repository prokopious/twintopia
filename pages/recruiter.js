import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Layout from '../components/Layout2'
import router from "next/router"
import jwt_decode from "jwt-decode"
import Link from "next/link"
export default function create() {
  const ref = useRef(null)
  const [company, setCompany] = useState("")
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const [phone, setPhone] = useState("")
  const [personalUrl, setPersonalUrl] = useState("")
  const [companyUrl, setCompanyUrl] = useState("")
  const [email, setEmail] = useState("")
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
      name: name,
      notes: body,
      personalUrl: personalUrl,
      companyUrl: companyUrl,
      company: company,
      phone: phone,
      email: email,
    }
    axios
      .post("https://radiant-oasis-73401.herokuapp.com/recruiters", details, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setName("")
        setEmail("")
        setBody("")
        setPhone("")
        setCompanyUrl("")
        setPersonalUrl("")
        setCompany("")
        setLoading(false)
      })
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
      <Layout>
      <div id="frame">
        <div className="heading">Create a recruiter</div>
        <div>
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
            id="companyUrl"
            className="paragraph"
            placeholder="Company URL.."
            value={companyUrl}
            onChange={e => setCompanyUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="personalUrl"
            className="paragraph"
            placeholder="Personal URL.."
            value={personalUrl}
            onChange={e => setPersonalUrl(e.target.value)}
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
        <div id="li">
          <Link href={`/recruiters`}>
            <a>see all recruiters</a>
          </Link>
        </div>
      </div>
</Layout>
      <style jsx>{`
        #frame {
          padding-left: 20px;
        }
        #h {
          padding-top: 0px;
          margin-bottom: 30px;
          color: #3a3a3a;
          font-size: 20px;
          font-weight: 500;
        }
        .paragraph {
          width: 700px;
          margin-bottom: 5px;
          height: 35px;
          border-radius: 0px;
          border: 1px solid #eeeeee;
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
          border: 1px solid #eeeeee;
          box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
            5px 5px 12px rgba(49, 49, 49, 0.164);
          width: 70px;
          vertical-align: middle;
        }
        .paragraph2 {
          width: 700px;
          margin-top: 2px;
          height: 200px;
          color: #3a3a3a;
          border-radius: 0px;
          border: 1px solid #eeeeee;
          padding: 5px;
          box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
            5px 5px 12px rgba(49, 49, 49, 0.164);
        }
      `}</style>
    </>
  )
}
