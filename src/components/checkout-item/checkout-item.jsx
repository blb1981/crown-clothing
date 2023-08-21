import { useContext } from 'react'

import './checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context'

const CheckoutItem = ({ cartItem }) => {
  const { clearItemFromCart, addItemToCart, removeCartItem } =
    useContext(CartContext)
  const { name, imageUrl, price, quantity } = cartItem

  const handleDeleteCheckoutItem = () => clearItemFromCart(cartItem)
  const handleAddItem = () => addItemToCart(cartItem)
  const handleRemoveItem = () => removeCartItem(cartItem)

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={handleRemoveItem}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={handleAddItem}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <span className='remove-button' onClick={handleDeleteCheckoutItem}>
        &#10005;
      </span>
    </div>
  )
}

export default CheckoutItem
