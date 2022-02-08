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
            <div>
              <Link href="/">
                <a>Home</a>
              </Link>
            </div>
            {/* <div id="z">
              <Link href="/create">
                <a>Post</a>
              </Link>
            </div> */}
            <div id="z">
              <Link href="/job">
                <a>Job</a>
              </Link>
            </div>
            <div id="z">
              <Link href="/recruiter">
                <a>Rcrtr</a>
              </Link>
            </div>
            <div id="z">
              <Link href="/recruiters">
                <a>Recs</a>
              </Link>
            </div>
            <div id="z">
              <Link href="/jobs">
                <a>Jbs</a>
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
          background-color:rgb(231, 231, 231);
          width: 100vw;
          padding: 20px;
          padding-left: 20px;
   
          margin-right: auto;
          margin-left: auto;
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
          grid-template-columns: 57px 38px 49px 48px 37px 42px;
          grid-gap: 0px;
        }

        @media (max-width: 700px) {
          #linkGrid {
            display: grid;
            grid-template-columns: 46px 45px 38px 49px 48px;
            grid-gap: 0px;
          }
        }
      `}</style>
    </>
  )
}
