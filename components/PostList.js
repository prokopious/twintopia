import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import formatDate from "../utils/format-date"

export default function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const apiUrl = `https://radiant-oasis-73401.herokuapp.com/posts`
    axios.get(apiUrl).then(response => setPosts(response.data))
  }, [])

  if (posts != []) {
    return (
      <div id="cont">
        <h1 id="he">All Posts</h1>
        {posts.map((post, i) => {
          return (
            <div key={i} id="postList">
              <Link href={post.slug}>
                <a>
                  <h2 id="tit">{post.title}</h2>
                </a>
              </Link>
              <div>{formatDate(post.createdAt)}</div>
            </div>
          )
        })}
        <style jsx>{`
          #cont {
            height: 100%;
          }
          #tit {
            margin-bottom: 5px;
            color: #414141;
          }
          #he {
            padding-bottom: 30px;
            color: #414141;
          }
        `}</style>
      </div>
    )
  } else {
    return <>Loading...</>
  }
}
