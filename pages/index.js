import PostList from "../components/PostList"
import Layout from "../components/Layout"
import AdminNav from '../components/AdminNav'

export default function Home() {
  return (
    <>
    <AdminNav />
      {/* <Layout>
        <div id="offset">
          <PostList />
        </div>
      </Layout> */}
      <style jsx>{`
        #offset {
          margin-left: 10px;
        }
      `}</style>
    </>
  )
}
