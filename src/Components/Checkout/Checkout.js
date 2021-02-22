import React, { Component } from 'react'
import { getInitializedOrderRequest, checkOutPay, cancelOrder } from '../../Store/actions/orderAction'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserInfo } from '../../Store/actions/authAction'
import allNigeriaStates from '../Helpers/all-states'
import './checkout.scss'
import Loading from '../layout/Loading'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      orderId: null,
      address: '',
      state: '',
      cancel: false
    }

  }
  componentWillMount() {
    this.props.getInitializedOrderRequest()
    this.props.getUserInfo()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSelectState = (event) => {
    this.setState({
      state: event.target.value
    });
  }

  handlePay = () => {
    this.props.checkOutPay(this.state);
  }
  handleCancelPay = () => {
    this.props.cancelOrder()
    this.setState({ cancel: true })
  }

  render() {
    const { auth } = this.props
    const { payload } = auth
    const { orders, checkOut, loading, orderError } = this.props.order
    const { cancel } = this.state
    if(loading && orderError === null) return <Loading />
    if (cancel) return <Redirect to='/' />
    if (checkOut && checkOut.authorization_url) {
      return window.location = checkOut.authorization_url
    }
    return (
      <div className="container mt-5 check-out-div">
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between">
            <span>Proceed to Payment: </span>
            <strong>{(orders && orders.amount) || this.props.location.state.amount}</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Delivery Location: </span>
            <strong>{payload && payload.address1 + ', ' + payload.state}</strong>
          </li>
          <h4 className="text-center mt-4">Specify Delivery Address</h4> <br />
          <li className="list-group-item d-flex justify-content-between">
            
            <form className="container text-center border rounded border-light p-5 bg-light mb-5" onSubmit={this.handleSubmit}>
             
              <div className="form-group row text-left">
                <label htmlFor="address" className="col-sm-2 col-form-label" > <b> Address:</b></label>
                <div className="col-sm-10">
                  <input type="text" id="address" className="form-control mb-4" placeholder="Address" onChange={this.handleChange} />
                </div>
              </div>
              
              <div className="form-group row">
            <label htmlFor="product-shipping-state" className="col-sm-4 col-form-label">Product Shipping State:</label>
            <div className="col-sm-8">
              <select id="state" className="form-control" name="state" id="state" onChange={this.onSelectState} >
                <option defaultValue>Choose...</option>
                {allNigeriaStates.map((state, i) => (<option key={i} data-key={i} >{state}</option>))}
              </select>
            </div>
          </div>

            </form>
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
    checkOutPay: (cred) => dispatch(checkOutPay(cred)),
    cancelOrder: () => dispatch(cancelOrder()),
    getUserInfo: () => dispatch(getUserInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)