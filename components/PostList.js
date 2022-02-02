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
      <div id="cont">
        <h1 id="he">All Posts</h1>
        {posts.map((post, i) => {
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]
          const date = new Date(post.createdAt)
          const month = months[date.getMonth()]
          const year = date.getFullYear()
          const day = date.getDate()
          const d = `${month} ${day}th, ${year}`
          return (
            <>
              <div key={i} id="postList">
                <Link href={post.slug}>
                  <a>
                    <h2 id="tit">{post.title}</h2>
                  </a>
                </Link>
                <div>{d}</div>
              </div>
            </>
          )
        })}
        <style jsx>{`
        #cont {
	height: 100%;
}
                a {
                  color: black;
                  text-decoration: none;
                }
                #tit {
                  margin-bottom: 5px;
                  color: #414141;
          
                }
                #he {
                  padding-bottom: 30px;
                  color: #414141;
    
                }
                #postList {

                }

           
                }
              `}</style>
      </div>
    )
  } else {
    return <>Loading...</>
  }
}
