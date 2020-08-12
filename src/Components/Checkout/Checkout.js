import React, { Component } from 'react'
import { getInitializedOrderRequest } from '../../Store/actions/orderAction'
import { connect } from 'react-redux'


class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      orderId: null
    }

  }
  componentWillMount() {
    this.props.getInitializedOrderRequest()
  }

  handlePay = () => {
//initialize payment here
  }

  render() {
    const { orders } = this.props.order
    console.log(this.state)

    return (
      <div className="container mt-5">
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between">
            <span>Proceed to Payment</span>
            <strong>{orders.amount}</strong>
          </li>
        </ul>
        <button type="submit" className="btn btn-lg  btn-success btn-block text-center mt-5 mb-5"
        // onClick={this.handleCheckout} 
        >
          Pay
          </button>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    order: state.order
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getInitializedOrderRequest: () => dispatch(getInitializedOrderRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)