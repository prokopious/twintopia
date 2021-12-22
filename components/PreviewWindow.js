import { useRef, useState } from "react"
import ReactMarkdown from "react-markdown"

export default function PreviewWindow(props) {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const onClick = () => setIsActive(!isActive)

  return (
    <>
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>Preview</span>
        </button>
        <div
          id="preview"
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ReactMarkdown>{props.markdown}</ReactMarkdown>
        </div>
      </div>
      <style jsx>{`
        .menu-container {
          position: relative;
          margin: 10px;
        }
        .menu {
          background: #ffffff;
          border-radius: 8px;
          position: absolute;
          top: 35px;
          right: 0;
          padding: 10px;
          width: 90%;
          min-height: 100vw;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-20px);
          transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
        }

        .menu.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          display: inline;
        }

        #window {
          width: 100%;
        }

        .menu-trigger {
          border-radius: 3px;
          background-color: rgb(255, 255, 255);
          padding: 5px 10px;
          display: inline;
          border: transparent;

          box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
            5px 5px 12px rgba(49, 49, 49, 0.164);
          vertical-align: middle;
        }

        .menu-trigger:hover {
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
        }

        .menu-trigger span {
          font-weight: 700;
          vertical-align: middle;
          font-size: 14px;
          margin: 0 10px;
        }

        .menu-trigger img {
          border-radius: 4px;
        }
      `}</style>
    </>
  )
}
