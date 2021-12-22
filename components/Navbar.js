import Link from "next/link"

export default function Navbar() {
  return (
    <>
      <div className="navigation">
        <div id="pad">
          <h1 id="twin">Twintopia</h1>
          <div id="linkGrid">
            <div id="l">
              <Link href="/create">
                <a>Admin</a>
              </Link>
            </div>
            <div id="l">
              <Link href="/login">
                <a>Login</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .navigation {
          background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
          height: 100%;
          width: 30vw;
        }
        #linkGrid {
            display: grid;
            grid-template-rows: 1fr 1fr 1fr;
            grid-gap: 10px;
          }

        #pad {
          padding-left: 20px;
        }

        @media (max-width: 700px) {
          .navigation {
            background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
            width: 100vw;
            height: 27vh;
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
            grid-template-rows: 1fr 1fr 1fr;
            grid-gap: 0px;
          }
        }
      `}</style>
    </>
  )
}
