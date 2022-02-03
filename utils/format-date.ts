const formatDate = (d: string): string => {
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

  const date = new Date(d)
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export default formatDate
