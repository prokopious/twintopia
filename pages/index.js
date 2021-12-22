import PostList from "../components/PostList"
import Navbar from "../components/Navbar"
import Layout from "../components/Layout"
import useStatus from "../hooks/use-stuff"

export default function Home() {
  return (
    <>
      <Layout>
        <Navbar />
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
