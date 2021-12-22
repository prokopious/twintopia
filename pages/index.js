import PostList from "../components/PostList"
import Navbar from "../components/Navbar"
import Layout from '../components/Layout'
import useStatus from '../hooks/use-stuff'


export default function Home() {

  return (
    <>
      <Layout>
        <Navbar />
        <div>
          <h1>All posts</h1>
          <PostList />
        </div>
      </Layout>
    </>
  )
}
