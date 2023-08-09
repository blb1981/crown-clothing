import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../../utils/firebase.utils'

const SignIn = () => {
  const logGoogleUsers = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
  }
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUsers}>Sign In</button>
    </div>
  )
}

export default SignIn
