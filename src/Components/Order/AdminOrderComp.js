import React, { Component } from 'react'
import { adminGetAllOrders, confirmOrderShipped } from '../../Store/actions/orderAction'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

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
    const ref = event.target.getAttribute('data-href')
    console.log(ref)
    // return <Redirect to={ref} />
  }

  render() {
    const { orders } = this.props.order
    console.log(this.props)
    return (
      <div>
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
            {
              orders && orders.map(order => (
                  <tr onClick={this.handleSelectOrder} data-href={`/admin/orders/${order.orderId}`} key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.amount}</td>
                    <td>{order.order_status.label}</td>
                    <td>{order.User.firstName}</td>
                    <td>{order.User.email}</td>
                    <td>{order.User.address1 + ', ' + order.User.address2 + ', ' + order.User.state + '.'}</td>
                    <td>{order.User.phoneNumber}</td>
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
