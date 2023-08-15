import { createContext, useState } from 'react'

export const CartContext = createContext({
  cart: [],
  setCart: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
})

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const value = {
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
