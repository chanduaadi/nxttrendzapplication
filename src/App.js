import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(eachList => eachList.id !== id)

    this.setState({cartList: filteredList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isProductThere = cartList.find(eachItem => eachItem.id === product.id)

    if (isProductThere === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const incrementQuantity = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      })
      this.setState({cartList: incrementQuantity})
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const quantityIncreasedData = cartList.map(eachData => {
      if (eachData.id === id) {
        return {...eachData, quantity: eachData.quantity + 1}
      }
      return eachData
    })

    this.setState({cartList: quantityIncreasedData})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const checkingQuantity = cartList.find(each => each.id === id)
    if (checkingQuantity.quantity === 1) {
      const filteredData = cartList.filter(eachItem => eachItem.id !== id)
      this.setState({cartList: filteredData})
    } else {
      const quantityDecrementData = cartList.map(eachData => {
        if (eachData.id === id) {
          return {...eachData, quantity: eachData.quantity - 1}
        }
        return eachData
      })
      this.setState({cartList: quantityDecrementData})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
