import { createContext, useState, useEffect } from 'react'

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase.utils'

/**======================
 *    Actual value
 *========================**/
export const UserContext = createContext({
  currentUser: null,
  setcurrentUser: () => null,
})

/**======================
 *    React component
 *========================**/
export const UserProvider = ({ children }) => {
  // Use the state hook to set the initial state
  const [currentUser, setcurrentUser] = useState(null)

  // Put the hook value and setter function in an object
  // This is passed down in the context component so it is accessible to children
  const value = { currentUser, setcurrentUser }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      console.log(user)
      setcurrentUser(user)
    })

    return unsubscribe // To close the listener
  }, [])

  // Return the actual component that will wrap around children components
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
