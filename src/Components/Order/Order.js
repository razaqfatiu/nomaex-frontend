import React, { Component } from 'react'
import { getUserOrders } from '../../Store/actions/orderAction'
import { connect } from 'react-redux'
import { formatCurrency } from '../Helpers/currency-formatter'
import Loading from '../layout/Loading'


class Order extends Component {

  componentWillMount() {
    this.props.getUserOrders()
  }

  render() {
    const { orders, loading, orderError } = this.props.order
    // const { orders } = order
    if(loading && orderError === null) return <Loading />
    return (
      <div className="text-center">
        <h2>Recent Orders</h2>
        <ul className="list-group mb-3">
          {
            orders && orders.map(order =>
              <li className="list-group-item d-flex justify-content-between lh-condensed" key={order.orderId}>
                <div>
                  <h6 className="my-0">Order Tracking Id: {order.orderId}</h6>
                  <small className="text-muted">Amount: {formatCurrency(order.amount)}</small>
                  <br />
                  <small className="text-muted">Status:  {order.order_status.label}</small>
                </div>
              </li>
            )
          }
        </ul>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    order: state.order,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrders: () => dispatch(getUserOrders()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
