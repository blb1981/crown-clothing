import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../../utils/firebase.utils'

import SignUpForm from '../../sign-up-form/sign-up-form.component'

const SignIn = () => {
  const logGooglePopupUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGooglePopupUser}>Sign In Popup</button>

      <SignUpForm />
    </div>
  )
}

export default SignIn
