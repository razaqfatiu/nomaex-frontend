import React, { Component } from 'react'
import { getInitializedOrderRequest, checkOutPay, cancelOrder } from '../../Store/actions/orderAction'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Loading from '../layout/Loading'
import { getUserInfo } from '../../Store/actions/authAction'


class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      orderId: null,
      cancel: false
    }

  }
  componentWillMount() {
    this.props.getInitializedOrderRequest()
    this.props.getUserInfo()
  }

  handlePay = () => {
    // const amount = this.props.order.orders.amount || this.props.location.state.amount
    this.props.checkOutPay();
  }
  handleCancelPay = () => {
    this.props.cancelOrder()
    this.setState({ cancel: true })
  }

  render() {
    const { auth } = this.props
    const { payload } = auth
    const { orders, checkOut, loading } = this.props.order
    const { cancel } = this.state

    console.log(this.props)

    if (cancel) return <Redirect to='/' />
    if (checkOut && checkOut.authorization_url) {
      return window.location = checkOut.authorization_url
    }
    return (
      <div className="container mt-5">
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between">
            <span>Proceed to Payment</span>
            <strong>{(orders && orders.amount) || this.props.location.state.amount}</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Delivery Location</span>
            <strong>{payload && payload.address1 + ', ' + payload.state}</strong>
          </li>
        </ul>
        <button type="submit" className="btn btn-lg  btn-success btn-block text-center mt-5 mb-5"
          onClick={this.handlePay}
        >
          Pay
          </button>
        <button type="submit" className="btn btn-lg  btn-danger btn-block text-center mt-5 mb-5"
          onClick={this.handleCancelPay}
        >
          Cancel
          </button>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    order: state.order
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getInitializedOrderRequest: () => dispatch(getInitializedOrderRequest()),
    checkOutPay: () => dispatch(checkOutPay()),
    cancelOrder: () => dispatch(cancelOrder()),
    getUserInfo: () => dispatch(getUserInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)