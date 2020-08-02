import React, { Component } from 'react'
import { getUserCartItems, deleteCartItem } from '../../Store/actions/cartAction'
import { connect } from 'react-redux'
import Loading from '../layout/Loading'
import { Link } from 'react-router-dom';
import './cart.scss'

class Cart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      deletedMsg: '',
      carts: this.props.cart,
      loading: this.props.loading
    }
  }

  componentWillMount() {
    this.props.getUserCartItems()
  }

  handleOnClick = (e) => {
    const cartId = e.target.getAttribute('data-key')
    this.props.deleteCartItem(cartId)
    // return this.props.history.push('/cart')
  }

  render() {
    const { carts, loading } = this.props.cart
    let total = 0
    let shippingTotal = 0
    // console.log(carts)
    if (loading) return <Loading />

    return (
      <div className="container cart-comp">
        <div className="order-md-2 mb-4">
          <button type="submit" className="btn btn-lg  btn-success btn-block text-center mb-3">Checkout</button>

          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            {(this.state.deletedMsg) ? this.state.deletedMsg : ''}
            <span className="badge badge-secondary badge-pill">{carts && carts.length}</span>
          </h4>
          <ul className="list-group mb-3">
            {
              carts && carts.map(cart => {
                total += (parseInt(cart.Product.productPrice) * parseInt(cart.quantity))
                shippingTotal += parseInt(cart.Product.ProductShipping.cost)
                return (
                  <li className="list-group-item d-flex justify-content-between lh-condensed" key={cart.cartId}>
                    <Link to={`/products/${cart.Product.productId}`}>
                      <div>
                        <h6 className="my-0">{cart.Product.productName}</h6>
                        {/* <small className="text-muted">{cart.Product.productDescription}</small>
                      <br /> */}
                        <small className="text-muted">Quantity: {cart.quantity}</small>
                        <br />
                        <small className="text-muted">Shipping cost: {cart.Product.ProductShipping.cost}</small>
                        {/* <br /> */}
                      </div>
                    </Link>
                    <span className="text-muted">
                      <span>&#8358;</span>
                      &nbsp;
                      {cart.Product.productPrice}
                      <br />
                      <button className="btn btn-outline-warning" data-key={cart.cartId} onClick={this.handleOnClick}>
                        {/* <FontAwesomeIcon icon={faMinusCircle} pull="right" size="lg" color="red" /> */} Remove
                      </button>
                    </span>

                  </li>
                )
              })
            }

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (NGN)</span>
              <strong>&#8358; {total}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping Total (NGN)</span>
              <strong>&#8358; {shippingTotal}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Gross Total (NGN)</span>
              <strong>&#8358; {total + shippingTotal}</strong>
            </li>
          </ul>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUserCartItems: () => dispatch(getUserCartItems()),
    deleteCartItem: (itm) => dispatch(deleteCartItem(itm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)