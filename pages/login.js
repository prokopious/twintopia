import { useState, useRef, useEffect } from "react"
import axios from "axios"
import Layout from '../components/Layout2'
import jwt_decode from "jwt-decode"
import { useStatus, useLogin } from '../hooks/use-stuff'

export default function Login() {
  const ref = useRef(null)
  const [username, setUsername] = useState("")
  const [token, setToken] = useState(null)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState(null)
  const {setLogin, setLogout} = useLogin();
 

  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("token")
      let decoded
      if (!token) {
        ref.current.textContent = "You are not logged in."
      } else if (token) {
        try {
          decoded = jwt_decode(token)
          if (Date.now() < decoded.exp * 1000) {
            ref.current.textContent = "You are logged in."
          } else if (Date.now() >= decoded.exp * 1000) {
            ref.current.textContent = "You are not logged in."
          } else {
            ref.current.textContent = "You are not logged in."
          }
        } catch (error) {
          ref.current.textContent = "You are not logged in."
        }
  
      }
    }
  }, [setToken, setLogin])

  const handleSubmit = () => {
    setLoading(true)
    setIsError(false)
    const details = {
      username: username,
      password: password,
    }

    axios
      .post("https://radiant-oasis-73401.herokuapp.com/users/login", details)
      .then(res => {
        setData(res.data)
        let authToken = res.data.token
        if (typeof window !== "undefined") {
          localStorage.setItem("token", authToken)
        }
        setLogin(true)
        setToken(authToken)
        setUsername("")
        setPassword("")
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        setIsError(true)
      })
  }
  return (
    <>
     <Layout>
      <div className="container">
        <main>
          <div id="string" ref={ref}></div>
          <div>
            {" "}
            <h5 id="h">Login</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="username"
                className="paragraph"
                placeholder="Username.."
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="password"
                className="paragraph"
                placeholder="Password.."
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {isError && (
              <small className="mt-3 d-inline-block text-danger">
                Something went wrong. Please try again later.
              </small>
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
          </div>
        </main>
      </div></Layout>
      <style jsx>{`
        .container {
          padding: 20px;
        }
      `}</style>
    </>
  )
}
