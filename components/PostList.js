import { useState, useEffect } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

export default function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const apiUrl = `https://radiant-oasis-73401.herokuapp.com/posts`
    axios.get(apiUrl).then(response => setPosts(response.data))
  }, [])

  if (posts != []) {
    return (
      <>
        {posts.map((post, i) => {
          let stamp = post.createdAt
          console.log(stamp)
          return (
            <>
              <div key={i} id="postList">
                <Link href={post.slug}>
                  <a>
                    <h3>{post.title}</h3>
                  </a>
                </Link>
                <div>{post.createdAt}</div>
                <div>{post.author}</div>
              </div>
              <style jsx>{`
                a {
                  color: black;
                  text-decoration: none;
                }
                #postList {
                }

                @media (max-width: 700px) {
                  #postList{
         

                  }
                  }
                }
              `}</style>
            </>
          )
        })}
      </>
    )
  } else {
    return <>Loading...</>
  }
}
