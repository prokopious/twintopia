import useFetch from '../hooks/use-fetch'

export default function Home() {
  const { data, loading, error } = useFetch(
    "https://radiant-oasis-73401.herokuapp.com/recruiters"
  )

  if (error) {
    console.log(error)
  }

  return <>{JSON.stringify(data)}</>
}
