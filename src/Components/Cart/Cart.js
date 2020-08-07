import React, { Component } from 'react'
import { getUserCartItems, deleteCartItem } from '../../Store/actions/cartAction'
import { connect } from 'react-redux'
import Loading from '../layout/Loading'
import { Link, Redirect } from 'react-router-dom';
import './cart.scss'
import checkAuth from '../Helpers/check-auth';
import { calcDiscount, calcDiscountPrice } from '../Helpers/price-converters';


class Cart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      deletedMsg: '',
      carts: this.props.cart,
      loading: this.props.loading
    }
  }

  componentDidMount() {
    if (checkAuth.isAuth()) {
      this.props.getUserCartItems()
    }
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
    let totalDiscount = 0
    const formatCurrency = (number) => new Intl.NumberFormat('en-IN').format(number)
    if (loading) return <Loading />

    return (
      <div className="container cart-comp">
        <div className="order-md-2 mb-4">

          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            {(this.state.deletedMsg) ? this.state.deletedMsg : ''}
            <span className="badge badge-secondary badge-pill">{carts && carts.length}</span>
          </h4>
          <ul className="list-group mb-3">
            {
              carts && carts.map(cart => {
                total += calcDiscountPrice(cart.Product.productPrice, cart.Product.productDiscount, cart.quantity)
                // total += ((parseInt(cart.Product.productPrice) * parseInt(cart.Product.productDiscount)) * parseInt(cart.quantity))
                shippingTotal += parseInt(cart.Product.ProductShipping.cost);
                totalDiscount += parseFloat(cart.Product.productDiscount) * parseInt(cart.Product.productPrice)
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
                       {formatCurrency(calcDiscountPrice(cart.Product.productPrice, cart.Product.productDiscount, cart.quantity))}
                      
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
              <strong>&#8358; {formatCurrency(total)}</strong>
            </li>
            
            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping Total (NGN)</span>
              <strong>&#8358; {formatCurrency(shippingTotal)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Gross Total (NGN)</span>
              <strong>&#8358; {formatCurrency(total + shippingTotal)}</strong>
            </li>
          </ul>

          <button type="submit" className="btn btn-lg  btn-success btn-block text-center mt-5 mb-5">Checkout</button>


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