import React, { Component } from 'react'
import { Nav} from "react-bootstrap";
import { connect } from 'react-redux';
import { getUserCartItems } from '../../Store/actions/cartAction';

class SignedInLinks extends Component {
  constructor(props) {
    super(props)
  }

  handleSignOut = () => {
    this.props.signOut()
  }

  render() {
    const { prop, cart } = this.props
    // console.log(cart)

    return (
      <Nav className="ml-auto" navbar >
        <Nav.Link className="text-white" href="/">Home</Nav.Link>
        <Nav.Link className="text-white" href="/contact">Contact Us</Nav.Link>
        <Nav.Link className="text-white" href="/orders">Orders</Nav.Link>
        <Nav.Link className="text-white" href="/cart">Cart <i className="fa fa-shopping-cart"></i> </Nav.Link>
        {/* <span className="badge badge-light">0</span> */}
        <Nav.Link className="text-white" onClick={prop.signOut} href="/signin">Log Out</Nav.Link>
      </Nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserCartItems: () => dispatch(getUserCartItems())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
