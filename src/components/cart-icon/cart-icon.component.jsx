import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const toggleDropdown = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <div className='cart-icon-container' onClick={toggleDropdown}>
      <ShoppingIcon />
      <span className='item-count'>{cartCount}</span>
      {/* TODO Fix this counter */}
    </div>
  )
}

export default CartIcon
