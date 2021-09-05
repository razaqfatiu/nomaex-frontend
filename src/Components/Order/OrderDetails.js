import React, { Component } from "react";
import { connect } from "react-redux";
import {
  adminGetOneOrder,
  confirmOrderShipped,
} from "../../Store/actions/orderAction";
import Loading from "../layout/Loading";

class OrderDetails extends Component {
  componentWillMount() {
    this.props.adminGetOneOrder(this.props.orderId);
  }

  handleConfirmOrder = (event) => {
    this.props.confirmOrderShipped(this.props.orderId);
    this.setState({ confirm: true });
    return window.location = "/admin/orders"

  };

  render() {
    let { orders, shoppingCart, loading, orderError } = this.props.order;
    if(loading && orderError === null) return <Loading />

    let carts = null;
    let orderResult;
    if (orders && orders !== null) {
      orders = [].concat(orders);
    }
    if (shoppingCart) {
      carts = shoppingCart.Carts;
    }
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Order Status</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer email</th>
              <th scope="col">Customer's Address</th>
              <th scope="col">Customer's Phone</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.amount}</td>
                  <td>{order.order_status.label}</td>
                  <td>{order.User.firstName}</td>
                  <td>{order.User.email}</td>
                  <td>
                    {order.User.address1 +
                      ", " +
                      order.User.address2 +
                      ", " +
                      order.User.state +
                      "."}
                  </td>
                  <td>{order.User.phoneNumber}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {carts &&
                carts.map((cart) => (
                  <tr key={cart.shoppingCartId}>
                    <td>{cart.Product.productId}</td>
                    <td>{cart.Product.productName}</td>
                    <td>{cart.Product.productShipping}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="text-center m-3">
          <button
            onClick={this.handleConfirmOrder}
            className="btn btn-success m-3"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.orderId;

  return {
    order: state.order,
    shoppingCart: state.shoppingCart,
    orderId: id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adminGetOneOrder: (id) => dispatch(adminGetOneOrder(id)),
    confirmOrderShipped: (id) => dispatch(confirmOrderShipped(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
