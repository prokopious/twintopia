import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import jwt_decode from "jwt-decode"
import router from "next/router"
import { useStatus, useLogin } from "../hooks/use-stuff"

export default function AdminNav() {
  const [token, setToken] = useState(null)
  const ref = useRef(null)
  const status = useStatus()
  const { setLogin, setLogout } = useLogin()

  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("token")
      let decoded
      if (!token) {
        ref.current.style.display = "none"
        return
      } else if (token) {
        try {
          decoded = jwt_decode(token)
          if (decoded.exp && Date.now() < decoded.exp * 1000) {
            ref.current.style.display = "block"
          } else if (Date.now() >= decoded.exp * 1000) {
            ref.current.style.display = "none"
          } else {
            ref.current.style.display = "none"
          }
        } catch (error) {
          ref.current.style.display = "none"
          return
        }
      }
    }
  }, [setToken, setLogout])

  const logout = () => {
    router.push("http://www.localhost:3005/login")
  }

  return (
    <>
      <div className="navigation">
        <div id="pad">
          <div id="linkGrid">
            <div id="z">
              <Link href="/">
                <a>Jobs</a>
              </Link>
            </div>
            <div id="z">
              <Link href="/recruiters">
                <a>Recruiters</a>
              </Link>
            </div>
            <div id="z">
              <Link href="/job">
                <a>Jb</a>
              </Link>
            </div>
            <div id="z">
              <Link href="/recruiter">
                <a>Rcrtr</a>
              </Link>
            </div>

            <div ref={ref} id="l">
              <div onClick={logout}>
                <a></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navigation {
          background-color: rgb(231, 231, 231);
          padding: 20px;
          padding-left: 20px;
          margin-top: 0;
          margin-right: auto;
          margin-left: auto;
        }
        a {
          text-decoration: none;
          color: black;
          padding-right: 8px;
        }
        #l {
          cursor: pointer;
        }
        #twin {
          margin-bottom: 5px;
          margin-top: 7px;
        }
        #pad {
          padding-left: 0px;
        }
        #linkGrid {
          display: flex;
        }

        @media (max-width: 700px) {
          #linkGrid {
          }
        }
      `}</style>
    </>
  )
}
