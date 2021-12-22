import { useState, createContext, useEffect, useContext } from "react"
import { getStorageItem, setStorageItem } from '../lib/storage.js'
export const StatusContext = createContext()
const CART_STATE_KEY = 'cart';

const stuff = {
  details: {
    body: "this is bullshit",
    slug: "",
    title: "",
    author: "",
    image: "",
  },
}
console.log("top of page")
export function useLogin() {
  const [status, setStatus] = useState(false)
  const [forms, setForms] = useState(stuff)
  const [edit, setEdit] = useState(stuff)

  
  useEffect(() => {
    const data = getStorageItem(CART_STATE_KEY);
    if ( data ) {
      updateForms(data);
    }
  }, []);

  useEffect(() => {
    setStorageItem(CART_STATE_KEY, forms);
  }, [forms]);


  function updateForms(details) {
    console.log("shit")
    setForms(details)
    let forms = details
    return forms
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
    setLogout,
    setLogin,
    updateForms,
  }
}
export function useStatus() {
  const crap = useContext(StatusContext);
  return crap;
}
