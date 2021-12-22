import { useState, useEffect } from "react"
import axios from "axios"
import { useLogin } from "../hooks/use-stuff"
import Link from "next/link"

export default function PostList2() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const apiUrl = `https://radiant-oasis-73401.herokuapp.com/posts`
    axios.get(apiUrl).then(response => setPosts(response.data))
  }, [])

  if (posts != []) {
    return (
      <>
        {posts.map((post, i) => {
          return (
            <div key={i} id="postList">
              <div>
                <Link href={`edit/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </div>
              <style jsx>{`
                a {
                  color: black;
                  text-decoration: none;
                }
              `}</style>
            </div>
          )
        })}
      </>
    )
  } else {
    return <>Loading...</>
  }
}
