import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatCurrency } from '../Helpers/currency-formatter'
import Loading from '../layout/Loading'
import { adminGetOneOrder } from '../../Store/actions/orderAction'

class OrderDetails extends Component {
  componentWillMount() {
    this.props.adminGetOneOrder(this.props.orderId)
  }
  render() {
    const { orders } = this.props.order
    // if (orders === []) return <Loading />
    // // else {
    // //       const { Carts } = orders.shopping_cart
    // // }
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
              // orders && orders.map(order => (
              //   <tr>
              //     <td>{order.orderId}</td>
              //     <td>{order.amount}</td>
              //     <td>{order.order_status.label}</td>
              //     <td>{order.User.firstName}</td>
              //     <td>{order.User.email}</td>
              //     <td>{order.User.address1 + ', ' + order.User.address2 + ', ' + order.User.state + '.'}</td>
              //     <td>{order.User.phoneNumber}</td>
              //     <td><button data-key={order.orderId} onClick={this.handleConfirmOrder} className="btn btn-success">Confirm</button></td>
              //   </tr>
              // ))
              
            }

          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.orderId;

  return {
    order: state.order,
    orderId: id
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    adminGetOneOrder: (id) => dispatch(adminGetOneOrder(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
