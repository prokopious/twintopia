const searchFilter = e => {
  setFiltered(
    data.filter(n => {
      return JSON.stringify(n).search(e.target.value) != -1
    })
  )
}

export default searchFilter
