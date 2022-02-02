import { useRef, useState } from "react"
import ReactMarkdown from "react-markdown"

export default function PreviewWindow(props) {
  const dropdownRef = useRef(null)
  const displayRef = useRef("inline")
  const [isActive, setIsActive] = useState(false)
  const onClick = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <button onClick={onClick} className="menu-trigger">
        <span>Preview</span>
      </button>
      <div className="menu-container" id="dropdown">
        <div
          id="dropdown-content"
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ReactMarkdown>{props.markdown}</ReactMarkdown>
        </div>
      </div>
      <style jsx>{`
        .menu-container {
          position: relative;
        }

        .menu {
          background: #ffffff;
          border-radius: 8px;
          position: absolute;
          top: 35px;
          right: 0;
          padding: 10px;
          min-height: 100vw;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
          opacity: 0;
          visibility: hidden;
          display: inline;
        }

        .menu.active {
          opacity: 1;
          width: 90%;
          visibility: visible;
          display: block;
          transform: translateY(0);
        }

        #window {
          width: 100%;
        }

        .menu-trigger {
          background-color: rgb(255, 255, 255);
          padding: 5px 10px;
          border: transparent;
          box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
            5px 5px 12px rgba(49, 49, 49, 0.164);
          display: inline;
          vertical-align: middle;
          width: 70px;
        }

        .menu-trigger:hover {
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
        }

    

        .menu-trigger img {
          border-radius: 4px;
        }
      `}</style>
    </>
  )
}
