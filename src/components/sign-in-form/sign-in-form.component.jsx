import { useState } from 'react'

import FormInput from '../form-input/form-input.component'

import './sign-in-form.styles.scss'

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase.utils'
import Button from '../button/button.component'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  /**======================
   *    Sign in with Google
   *========================**/
  const handleSignInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  /**======================
   *    Sign in with email/password
   *========================**/
  const handleEmailAndPasswordSubmit = async (event) => {
    event.preventDefault()

    try {
      await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields()
    } catch (error) {
      console.log(error.code)

      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for this email')
          break
        case 'auth/user-not-found':
          alert('No user with this email exists')
          break
        default:
          console.log(error.code)
      }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Already Have An Account?</h2>
      <span>Sign in with email and password!</span>

      <form onSubmit={handleEmailAndPasswordSubmit}>
        <FormInput
          label='Email Address'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            type='button'
            buttonType='google'
            onClick={handleSignInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
