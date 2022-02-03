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
const defaultJob = {
  details: {
    body: "",
    company: "",
    title: "",
    comapanyUrl: "",
    jobUrl: "",
  },
}
const defaultRecruiter = {
  details: {
    body: "",
    company: "",
    name: "",
    personalUrl: "",
    companyUrl: "",
    phone: "",
    email: "",
  },
}

export function useLogin() {
  const [status, setStatus] = useState(false)
  const [forms, setForms] = useState(defaultForms)
  const [edit, setEdit] = useState(defaultForms)
  const [editJob, setEditJob] = useState(defaultJob)
  const [editRecruiter, setEditRecruiter] = useState(defaultRecruiter)

  useEffect(() => {
    const data = getStorageItem("cart")
    if (data) {
      setForms(data)
    }
    const d = getStorageItem("edit")
    if (d) {
      setEdit(d)
    }
    const j = getStorageItem("jobs")
    if (j) {
      setEdit(j)
    }
    const r = getStorageItem("recruiters")
    if (r) {
      setEdit(r)
    }
  }, [])

  useEffect(() => {
    if (forms !== defaultForms) setStorageItem("cart", forms)
    if (edit !== defaultForms) setStorageItem("edit", edit)
    if (editJob !== defaultJob) setStorageItem("jobs", editJob)
    if (editRecruiter !== defaultRecruiter)
      setStorageItem("recruiters", editRecruiter)
  }, [forms, edit, editJob, editRecruiter])

  function updateForms(details) {
    setForms(details)
    let forms = details
    return forms
  }
  function updateEdit(details) {
    setEdit(details)
    let edit = details
    return edit
  }
  function updateRecruiter(details) {
    setEditRecruiter(details)
    let editRecruiter = details
    return editRecruiter
  }
  function updateJob(details) {
    setEditJob(details)
    let editJob = details
    return editJob
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
    editJob,
    editRecruiter,
    updateEdit,
    updateJob,
    updateRecruiter,
    setLogout,
    setLogin,
    updateForms,
  }
}
export function useStatus() {
  const crap = useContext(StatusContext)
  return crap
}
