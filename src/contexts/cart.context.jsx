import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeCartItem: () => {},
  clearItemFromCart: () => {},
  totalPrice: 0,
})

// Helper function to determine the logic of adding items to cart
const addCartItem = (cartItems, productToAdd) => {
  // See if cartitems has product to add already in it
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    })
  }

  // Return new array with modified items or new items
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

// Helper function to remove cart item
const removeCartItemHelper = (cartItems, productToRemove) => {
  // Find the item
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  )

  // Check if quantity is equal to 1. If so, remove from cart altogether
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
  }

  // Return array of cartItems with modified quantity
  return cartItems.map((cartItem) => {
    return cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  })
}

const clearItemFromCartHelper = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity
    }, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newTotal = cartItems.reduce((total, cartitem) => {
      return total + cartitem.quantity * cartitem.price
    }, 0)
    setTotalPrice(newTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeCartItem = (productToRemove) => {
    setCartItems(removeCartItemHelper(cartItems, productToRemove))
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearItemFromCartHelper(cartItems, cartItemToClear))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeCartItem,
    clearItemFromCart,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
