import { createContext, useEffect, useReducer } from 'react'

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase.utils'

export const UserContext = createContext({
  currentUser: null,
  setcurrentUser: () => null,
})

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
  console.log('dispatched')
  console.log({ action })
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      }
    default:
      throw new Error(`Unhandled type ${type}`)
  }
}

const INITIAL_STATE = {
  currentUser: null,
}

export const UserProvider = ({ children }) => {
  // const [currentUser, setcurrentUser] = useState(null)
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)

  const { currentUser } = state
  console.log({ currentUser })

  const setcurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
  }

  const value = { currentUser, setcurrentUser }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }

      setcurrentUser(user)
    })

    return unsubscribe // To close the listener
  }, [])

  // Return the actual component that will wrap around children components
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
