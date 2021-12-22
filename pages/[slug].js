import ReactMarkdown from "react-markdown"

export default function post({ post }) {
  if (post != {}) {
    return (
      <>
        <main>
          <div id="box">
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
          </div>
        </main>
      </>
    )
  } else {
    return <>Loading...</>
  }
}

export async function getStaticPaths() {
  const res = await fetch(`https://radiant-oasis-73401.herokuapp.com/posts`)
  const posts = await res.json()
  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://radiant-oasis-73401.herokuapp.com/posts/${params.slug}`
  )
  const post = await res.json()


  // Pass post data to the page via props
  return { props: { post } }
}
