import PostList from "../components/PostList"
import Layout from "../components/Layout"

export default function Home() {
  return (
    <>
      <Layout>
        <div id="offset">
          <PostList />
        </div>
      </Layout>
      <style jsx>{`
        #offset {
          margin-left: 10px;
        }
      `}</style>
    </>
  )
}
