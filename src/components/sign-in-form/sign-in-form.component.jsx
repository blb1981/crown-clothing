import { useState } from 'react'

import FormInput from '../form-input/form-input.component'

import './sign-in-form.styles.scss'

import {
  createUserDocumentFromAuth,
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

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response)
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

      <form onSubmit={handleSubmit}>
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
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
