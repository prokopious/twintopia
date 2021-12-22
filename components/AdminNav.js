import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import jwt_decode from "jwt-decode"
import router from "next/router"
import { useStatus, useLogin } from "../hooks/use-stuff"
import PostWindow from "../components/PostWindow"

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
    router
      .push("http://www.localhost:3005/login")

  }

  return (
    <>
      <div className="navigation">
        <div id="pad">
          <div id="linkGrid">
            <div>
              <Link href="/">
                <a>Blog</a>
              </Link>
            </div>
            <div id="z">
              <Link href="/create">
                <a>Create</a>
              </Link>
            </div>

            <div ref={ref} id="l">
              <div onClick={logout}>
                <a>Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navigation {
          background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
          width: 100vw;
          padding: 20px;
        }

        a {
          text-decoration: none;
          color: black;
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
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 7fr;
          grid-gap: 0px;
        }

        @media (max-width: 700px) {
          #linkGrid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 0px;
          }
        }
      `}</style>
    </>
  )
}
