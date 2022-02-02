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
      <><div id="list"><h3>Select a post</h3>
        {posts.map((post, i) => {
          return (
            <div key={i} id="postList">
              <p>
                <Link href={`edit/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </p>
              <style jsx>{`
                a {
                  color: black;
                  text-decoration: none;
                }
                #list {
                  padding: 20px;
                  margin-left: 20px;
                }
              `}</style>
            </div>
          )
        })}
        </div>
      </>
    )
  } else {
    return <>Loading...</>
  }
}
