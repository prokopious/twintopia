import { useRef } from "react"
import PostList2 from "./PostList2"
import ReactMarkdown from "react-markdown"
export default function DropdownList() {
  const box = useRef(null)
  const onClick = () => {
    const span = box.current
    const z = span.classList[1]
    if (z == "dropdown-content") {
      span.classList.remove("dropdown-content")
      span.classList.add("content")
    } else {
      span.classList.remove("content")
      span.classList.add("dropdown-content")
    }
  }
  return (
    <div className="dropdown">
      <button onClick={onClick} className="dropbtn">
        Edit
      </button>
      <div ref={box} className="dropdown-content"> <PostList2 /> </div>

      <style jsx>{`
        .dropbtn {
            background-color: rgb(255, 255, 255);
          padding: 5px 10px;
          border: transparent;
          box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
            5px 5px 12px rgba(49, 49, 49, 0.164);
          display: inline-block;
          vertical-align: middle;
          width: 70px;
          margin-left: 5px;
        }

        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 90vw;
          min-height: 100vw;
          transform: translateY(20px);
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          
        }

        .content {
          display: block;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 90vw;
          min-height: 100vw;
          transform: translateY(40px 0px 40px);
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

     
      `}</style>
    </div>
  )
}
