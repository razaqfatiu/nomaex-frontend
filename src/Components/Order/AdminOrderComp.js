import React, { Component } from 'react'
import { adminGetAllOrders, confirmOrderShipped } from '../../Store/actions/orderAction'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Loading from '../layout/Loading'

class AdminOrderComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirm: false
    }
  }

  componentWillMount() {
    this.props.adminGetAllOrders()
  }

  handleConfirmOrder = (event) => {
    const id = event.target.getAttribute('data-key')
    this.props.confirmOrderShipped(id)
    return this.setState({ confirm: true })
  }
  handleSelectOrder = (event) => {
    const id = event.currentTarget.getAttribute('data-id')
     return window.location = `/admin/orders/${id}`
  }

  render() {
    const { orders, loading } = this.props.order
    if(loading) return <Loading />

    return (
      <div className="table-responsive ">
        <table className="table border border-primary">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Order Status</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer email</th>
              <th scope="col">Customer's Address</th>
              <th scope="col">Customer's Phone</th>
              <th scope="col">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {
              orders && orders.map(order => (
                  <tr data-id={order.orderId} key={order.orderId} onClick={this.handleSelectOrder}>
                    <td>{order.orderId}</td>
                    <td>{order.amount}</td>
                    <td>{order.order_status.label}</td>
                    <td>{order.User.firstName + "  " + order.User.lastName}</td>
                    <td>{order.User.email}</td>
                    <td>{order.User.address1 + ', ' + order.User.address2 + ', ' + order.User.state + '.'}</td>
                    <td>{order.User.phoneNumber}</td>
                    <td>{order.order_status.label}</td>
                    {/* <td><button data-key={order.orderId} onClick={this.handleConfirmOrder} className="btn btn-success">Confirm</button></td> */}
                  </tr>
              ))
            }

          </tbody>
        </table>
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
    adminGetAllOrders: () => dispatch(adminGetAllOrders()),
    confirmOrderShipped: (id) => dispatch(confirmOrderShipped(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderComp)
