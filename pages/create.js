import { useState, useEffect, useRef } from "react"
import AdminNav from "../components/AdminNav"
import axios from "axios"
import { getStorageItem } from '../lib/storage.js'
import router from "next/router"
import jwt_decode from "jwt-decode"
import PreviewWindow from "../components/PreviewWindow"
import PostWindow from "../components/PostWindow"
import { useStatus } from "../hooks/use-stuff"

export default function create() {

  const { forms, updateForms } = useStatus()
  const store = getStorageItem("cart")
  const ref = useRef(null)
  const [image, setImage] = useState(store ? store.details.image : forms.details.image)
  const [slug, setSlug] = useState(store ? store.details.slug : forms.details.slug)
  const [title, setTitle] = useState(store ? store.details.title : forms.details.title)
  const [body, setBody] = useState(store ? store.details.body : forms.details.body)
  const [author, setAuthor] = useState(store ? store.details.author : forms.details.author)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState([])
  const [data, setData] = useState(null)
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("token")
      setToken(token)
    }
  }, [setToken])

  useEffect(() => {
    const shit = {
      details: {
        body: body,
        slug: slug,
        title: title,
        author: author,
        image: image,
      },
    }
    updateForms(shit)
  }, [slug, body, title, author, image])

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

  const handleSubmit = () => {
    setLoading(true)
    setIsError(false)
    const details = {
      title: title,
      body: body,
      author: author,
      slug: slug,
      image: image,
    }
    axios
      .post("https://radiant-oasis-73401.herokuapp.com/posts", details, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setData(res.data)
        setTitle("")
        setBody("")
        setAuthor("")
        setSlug("")
        setImage("")
        setLoading(false)
      })

      .catch(err => {
        setLoading(false)
        if (err.response.status == 401) {
          ref.current.textContent = "You are not logged in."
          router.push("./login")
        } else if (err.response.status == 500) {
          console.log(err.response)
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
      <AdminNav />
      <PreviewWindow markdown={body} />
      <PostWindow />

      <div id="frame">
        <h5 id="h">Create A Post</h5>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            title="title"
            className="paragraph"
            placeholder="Title.."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="author"
            className="paragraph"
            placeholder="Author.."
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="slug"
            className="paragraph"
            placeholder="Slug.."
            value={slug}
            onChange={e => setSlug(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="image"
            className="paragraph"
            placeholder="Image.."
            value={image}
            onChange={e => setImage(e.target.value)}
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
      </div>

      <style jsx>{`
        #frame {
          padding: 20px;
          align-items: center;
        }
        #h {
          margin-top: 0;
          padding-top: 0px;
          padding-bottom: 0px;
          color: #3a3a3a;
          font-size: 24px;
          font-weight: 500;
        }
        .paragraph {
          width: 500px;
          margin-bottom: 5px;
          height: 35px;
          border-radius: 3px;
          border: transparent;
          box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
            5px 5px 12px rgba(49, 49, 49, 0.164);
          padding-left: 5px;
        }
        #string {
          white-space: pre-wrap;
          padding-top: 15px;
        }
        #buttt {
          border-radius: 3px;
          background-color: rgb(255, 255, 255);
          padding: 3px 27px;
          border: transparent;
          color: #3a3a3a;
          box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
            5px 5px 12px rgba(49, 49, 49, 0.164);
        }
        .paragraph2 {
          width: 500px;
          margin-top: 2px;
          height: 200px;
          border-radius: 3px;
          color: #3a3a3a;
          border: transparent;
          padding: 5px;
          box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
            5px 5px 12px rgba(49, 49, 49, 0.164);
        }
      `}</style>
    </>
  )
}
