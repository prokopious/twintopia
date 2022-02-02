import Link from "next/link"

export default function Navbar() {
  return (
    <div className="navigation">
      <div id="content">
        <div id="pad">
          <h1 id="twin">Twintopia</h1>
        </div>
      </div>
      <style jsx>{`
        .navigation {
          background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
          position: fixed; 
          height: 100vh;
          width: 25vw;
          overflow: auto;
        }
        #content {
          display: inline-block;
          vertical-align: top;
          height: 100%;
          width: 82%;
          overflow: auto;
        }
        #linkGrid {
          display: grid;
          grid-template-rows: 1fr 1fr 1fr;
          grid-gap: 10px;
        }
        #twin {
          color: white;
        }
        #pad {
          padding-left: 20px;
        }

        @media (max-width: 700px) {
          .navigation {
            width: 100vw;
            height: 27vw;
          }
          #twin {
            margin-bottom: 5px;
          }
          #pad {
            padding-left: 10px;
          }

          #linkGrid {
            display: grid;
            grid-template-rows: 1fr 1fr 1fr;
            grid-gap: 0px;
          }
        }
      `}</style>
    </div>
  )
}
