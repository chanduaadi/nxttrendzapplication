import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      let totalAmount = 0
      cartList.forEach(eachItem => {
        totalAmount += eachItem.price * eachItem.quantity
      })
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-all-btn"
                  type="button"
                  onClick={removeAllCartItems}
                >
                  Remove All
                </button>
                <CartListView />
                <div className="cart-summary-cart">
                  <h1 className="amount-msg">
                    Order Total:
                    <span className="amount">{`Rs ${totalAmount}/-`}</span>
                  </h1>
                  <p className="item-length-text">{`${cartList.length} Items in cart`}</p>
                  <button className="order-place-button" type="button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
