import React, { Component } from "react";
import {
  getUserCartItems,
  deleteCartItem,
} from "../../Store/actions/cartAction";
import { connect } from "react-redux";
import Loading from "../layout/Loading";
import { Link, Redirect } from "react-router-dom";
import "./cart.scss";
import checkAuth from "../Helpers/check-auth";
import { calcDiscountPrice } from "../Helpers/price-converters";
import { formatCurrency } from "../Helpers/currency-formatter";
import { initializeOrder } from "../../Store/actions/cartAction";
import { getInitializedOrderRequest } from "../../Store/actions/orderAction";
import { calcShippingDiscount } from "../Helpers/calculate-shipping-discount";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedMsg: "",
      amount: "",
      total: 0,
      checkOut: false,
    };
  }

  componentWillMount() {
    if (checkAuth.isAuth()) {
      this.props.getUserCartItems();
    }
  }
  componentDidMount() {
    this.props.getInitializedOrderRequest();
  }

  handleOnDelete = (e) => {
    const cartId = e.target.getAttribute("data-key");
    this.props.deleteCartItem(cartId);
  };

  handleCheckout = (e) => {
    const amount = e.target.getAttribute("data-key");
    this.setState({ checkOut: true, amount });
    return this.props.initializeOrder({ amount });
  };

  render() {
    const { carts, loading, cartError } = this.props.cart;
    const { orders } = this.props.order;
    const { order } = this.props;
    const { checkOut } = this.state;
    if (loading && cartError === null) return <Loading />;

    let total = 0;

    let shippingTotal = 0;
    let totalDiscount = 0;

    if (checkOut)
      return (
        <Redirect
          to={{
            pathname: "/checkout",
            state: { amount: this.state.amount },
          }}
        />
      );
    if (orders && orders.checkedOut === false)
      return <Redirect to="/checkout" />;
    // this.props.history.push('/checkout')
    if (order && (order.status === 201 || order.status === 302))
      return <Redirect to="/checkout" />;
    if (this.props.cart && this.props.cart.loading) return <Loading />;
    if (carts.length === 0)
      return (
        <h2 className="text-center">Select Products to add in the cart</h2>
      );
    // if (loading) return <Loading />

    return (
      <div className="container cart-comp">
        <div className="order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            {this.state.deletedMsg ? this.state.deletedMsg : ""}
            <span className="badge badge-secondary badge-pill">
              {carts && carts.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {carts &&
              carts.map((cart) => {
                total += calcDiscountPrice(
                  cart.Product.productPrice,
                  cart.Product.productDiscount,
                  cart.quantity
                );
                shippingTotal += parseInt(
                  calcShippingDiscount(
                    cart.Product.ProductShipping.cost,
                    cart.quantity
                  )
                );
                totalDiscount +=
                  parseFloat(cart.Product.productDiscount) *
                  parseInt(cart.Product.productPrice);
                if (cart.Product.isDeleted) {
                  total -= calcDiscountPrice(
                    cart.Product.productPrice,
                    cart.Product.productDiscount,
                    cart.quantity
                  );
                  shippingTotal -= calcShippingDiscount(
                    cart.Product.ProductShipping.cost,
                    cart.quantity
                  );
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between lh-condensed"
                      key={cart.cartId}
                      style={{ opacity: 0.7 }}
                    >
                      <Link to={`/products/${cart.Product.productId}`}>
                        <div>
                          <h6 className="my-0">{cart.Product.productName}</h6>
                          <b>
                            {" "}
                            Product is no more available Kindly remove this
                            product before check out
                          </b>
                          <br />
                          <small className="text-muted">
                            Quantity: {cart.quantity}
                          </small>
                          <br />
                          <small className="text-muted">
                            Shipping cost for {cart.quantity} units:{" "}
                            {calcShippingDiscount(
                              cart.Product.ProductShipping.cost,
                              cart.quantity
                            )}
                          </small>

                          {/* <br /> */}
                        </div>
                      </Link>
                      <span className="text-muted">
                        {/* <span>&#8358;</span>
                      &nbsp; */}
                        {formatCurrency(
                          calcDiscountPrice(
                            cart.Product.productPrice,
                            cart.Product.productDiscount,
                            cart.quantity
                          )
                        )}

                        <br />
                        <button
                          style={{ opacity: 2 }}
                          className="btn btn-danger"
                          data-key={cart.cartId}
                          onClick={this.handleOnDelete}
                        >
                          Remove
                        </button>
                      </span>
                    </li>
                  );
                }
                return (
                  <li
                    className="list-group-item d-flex justify-content-between lh-condensed"
                    key={cart.cartId}
                  >
                    <Link to={`/products/${cart.Product.productId}`}>
                      <div>
                        <h6 className="my-0">{cart.Product.productName}</h6>
                        {/* <small className="text-muted">{cart.Product.productDescription}</small>
                      <br /> */}
                        <small className="text-muted">
                          Quantity: {cart.quantity}
                        </small>
                        <br />
                        <small className="text-muted">
                          Shipping cost for {cart.quantity} units:{" "}
                          {calcShippingDiscount(
                            cart.Product.ProductShipping.cost,
                            cart.quantity
                          )}
                        </small>
                        {/* <br /> */}
                      </div>
                    </Link>
                    <span className="text-muted">
                      {/* <span>&#8358;</span>
                      &nbsp; */}
                      {formatCurrency(
                        calcDiscountPrice(
                          cart.Product.productPrice,
                          cart.Product.productDiscount,
                          cart.quantity
                        )
                      )}

                      <br />
                      <button
                        className="btn btn-outline-warning"
                        data-key={cart.cartId}
                        onClick={this.handleOnDelete}
                      >
                        Remove
                      </button>
                    </span>
                  </li>
                );
              })}

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (NGN)</span>
              <strong>{formatCurrency(total)}</strong>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping Total (NGN)</span>
              <strong>{formatCurrency(shippingTotal)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Gross Total (NGN)</span>
              <strong>{formatCurrency(total + shippingTotal)}</strong>
            </li>
          </ul>

          <button
            type="submit"
            className="btn btn-lg  btn-success btn-block text-center mt-5 mb-5"
            data-key={total + shippingTotal}
            onClick={this.handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserCartItems: () => dispatch(getUserCartItems()),
    deleteCartItem: (itm) => dispatch(deleteCartItem(itm)),
    initializeOrder: (cred) => dispatch(initializeOrder(cred)),
    getInitializedOrderRequest: () => dispatch(getInitializedOrderRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
