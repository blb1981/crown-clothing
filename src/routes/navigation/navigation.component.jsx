import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'

import { UserContext } from '../../contexts/user.context'

import { signOutUser } from '../../utils/firebase.utils'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import './navigation.styles.scss'

const Navigation = () => {
  const { currentUser, setcurrentUser } = useContext(UserContext)

  const signOutHandler = async () => {
    await signOutUser()
    setcurrentUser(null)
  }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <div>
            <CrwnLogo />
          </div>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <Link className='nav-link' onClick={signOutHandler}>
              SIGN OUT
            </Link>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
