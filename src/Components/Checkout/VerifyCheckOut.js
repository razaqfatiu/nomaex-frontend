import React, { Component } from 'react'
import { verifyOrderCheckOut } from '../../Store/actions/orderAction'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'


class VerifyCheckOut extends Component {
  componentWillMount() {
    this.props.verifyOrderCheckOut()

  }

  render() {
    const { loading, order } = this.props
    const { orders } = order
    console.log(this.props)
    // if (orders) return <Redirect to="/orders" />
    return (
      <div className="text-center">
        <h2 className="text-center">
          Transaction Completed
        </h2>
        <br />
        <Link to='/orders'>
          <button className="btn btn-success">Recent Orders</button>
        </Link>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    order: state.order
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    verifyOrderCheckOut: () => dispatch(verifyOrderCheckOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCheckOut)

