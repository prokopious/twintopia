import { useState, createContext, useEffect, useContext } from "react"
import { getStorageItem, setStorageItem } from "../lib/storage.js"
export const StatusContext = createContext()
const CART_STATE_KEY = "cart"

const defaultForms = {
  details: {
    body: "",
    slug: "",
    title: "",
    author: "",
    image: "",
  },
}

export function useLogin() {
  const [status, setStatus] = useState(false)
  const [forms, setForms] = useState(defaultForms)
  const [edit, setEdit] = useState(defaultForms)

  useEffect(() => {
    const data = getStorageItem("cart")
    if (data) {
      setForms(data)
    }
    const d = getStorageItem("edit")
    if (d) {
      setEdit(d)
    }
  }, [])

  useEffect(() => {
      if (forms !== defaultForms)
      setStorageItem("cart", forms)
      if (edit !== defaultForms)
      setStorageItem("edit", edit)
  }, [forms, edit])

  function updateForms(details) {
    setForms(details)
    let forms = details
    return forms
  }
  function updateEdit(details) {
    setEdit(details)
    let forms = details
    return edit
  }
  function setLogin() {
    setStatus(true)
    return status
  }
  function setLogout() {
    setStatus(false)
    return status
  }
  return {
    forms,
    status,
    edit,
    updateEdit,
    setLogout,
    setLogin,
    updateForms,
  }
}
export function useStatus() {
  const crap = useContext(StatusContext)
  return crap
}
