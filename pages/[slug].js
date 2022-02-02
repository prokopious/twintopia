import ReactMarkdown from "react-markdown"
import Layout from "../components/Layout"

export default function post({ post }) {
  if (post != {}) {
    const date = new Date(post[0].createdAt)
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
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const day = date.getDate()
    const d = `${month} ${day}th, ${year}`
    return (
      <>
        <Layout>
          <div id="box">
            <main>
              <h1>{post[0].title}</h1>
              <h4>{d}</h4>
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    <div style={{ width: "40%" }}>
                      <img src={props.src} width="100%" height="auto" />
                    </div>
                  ),
                }}
              >
                {post[0].body}
              </ReactMarkdown>
            </main>
          </div>
          <style jsx>{`
            #box {
              margin-left: 20px;
        
              width: 90%;
            }
          `}</style>
        </Layout>
      </>
    )
  } else {
    return <>Loading...</>
  }
}

export async function getStaticPaths() {
  const res = await fetch(`https://radiant-oasis-73401.herokuapp.com/posts`)
  const posts = await res.json()
  console.log(posts)
  const paths = posts.map(post => ({
    params: {
      slug: post.slug,
    },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://radiant-oasis-73401.herokuapp.com/posts/slug/${params.slug}`
  )

  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}
