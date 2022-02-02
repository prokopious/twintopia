import { useState, useEffect, useRef } from "react"
import AdminNav from "../../components/AdminNav"
import axios from "axios"
import router from "next/router"
import { getStorageItem, setStorageItem } from "../../lib/storage.js"
import jwt_decode from "jwt-decode"
import PreviewWindow from "../../components/PreviewWindow"
import { useStatus } from "../../hooks/use-stuff"

export default function edit({ data }) {
  const store = getStorageItem("edit")
  const { edit, updateEdit } = useStatus()
  const ref = useRef(null)
  const [image, setImage] = useState("")
  const [slug, setSlug] = useState(store ? store.details.slug : data[0].slug)
  const [title, setTitle] = useState(
    store ? store.details.title : data[0].title
  )
  const [body, setBody] = useState(store ? store.details.body : data[0].body)
  const [author, setAuthor] = useState(
    store ? store.details.author : data[0].author
  )
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("token")
      setToken(token)
    }
  }, [setToken])

  useEffect(() => {
    const update = {
      details: {
        body: body,
        slug: slug,
        title: title,
        author: author,
        image: image,
      },
    }
    updateEdit(update)
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
        } catch (error) {
          router.push("./login")
        }
        if (Date.now() < decoded.exp * 1000) {
          return
        } else if (Date.now() >= decoded.exp * 1000) {
          router.push("./login")
        } else {
          router.push("./login")
        }
      }
    }
  }, [])

  const clearStorage = () => {
    setBody(data[0].body)
    setTitle(data[0].title)
    setSlug(data[0].slug)
    setAuthor(data[0].author)
    if (typeof window !== "undefined") {
      window.location.reload(false)
    }
  }

  function refreshPage() {
    if (typeof window !== undefined) {
      window.location.reload(false)
    }
  }
 
  const del = () => {
    axios
      .delete(
        `https://radiant-oasis-73401.herokuapp.com/posts/${data[0]._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        console.log(res)
        setTitle("")
        setBody("")
        setAuthor("")
        setSlug("")
        setImage("")
        setLoading(false)
      })
      .then(router.push("/create"))

      .catch(err => {
        console.log(err)
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
      .put(
        `https://radiant-oasis-73401.herokuapp.com/posts/${data[0]._id}`,
        details,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        console.log(res)
        setTitle("")
        setBody("")
        setAuthor("")
        setSlug("")
        setImage("")
        setLoading(false)
      })
      .then(refreshPage())

      .catch(err => {
        console.log(err)
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

  if (typeof data !== "undefined") {
    return (
      <>
        <AdminNav />
        <PreviewWindow markdown={body} />
        <button id="buttt" onClick={del}>
          Delete
        </button>
        <div id="frame">
          <h5 id="h">Edit Post</h5>
          <button onClick={clearStorage}>reset</button>
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
          {isError && (
            <small className="mt-3 d-inline-block text-danger"></small>
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
            background-color: rgb(255, 255, 255);
            padding: 5px 10px;
            border: transparent;
            box-shadow: -5px -5px 15px rgba(119, 119, 119, 0.041),
              5px 5px 12px rgba(49, 49, 49, 0.164);

            width: 70px;
            vertical-align: middle;
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
  } else {
    return <></>
  }
}
export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://radiant-oasis-73401.herokuapp.com/posts/slug/${params.slug}`
  )
  const data = await res.json()
  return { props: { data } }
}
