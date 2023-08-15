import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext)

  const toggleDropdown = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <div className='cart-icon-container' onClick={toggleDropdown}>
      <ShoppingIcon />
      <span className='item-count'>10</span>
    </div>
  )
}

export default CartIcon
