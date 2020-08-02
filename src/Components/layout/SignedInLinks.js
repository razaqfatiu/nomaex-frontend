import React, { Component } from 'react'
import { Navbar, Button, Nav, Form, FormControl } from "react-bootstrap";
import { connect } from 'react-redux';
import { getUserCartItems } from '../../Store/actions/cartAction';

class SignedInLinks extends Component {
  constructor(props) {
    super(props)
  }

  handleSignOut() {
    this.props.signOut()
  }
  render() {
    const { prop, cart } = this.props
    console.log(cart)

    return (
      <Nav className="ml-auto" navbar >
        <Nav.Link className="text-white" href="/">Home</Nav.Link>
        <Nav.Link className="text-white" href="/categories/contact">Contact Us</Nav.Link>
        <Nav.Link className="text-white" href="#">About Us</Nav.Link>
        <Nav.Link className="text-white" href="#"><i className="fa fa-shopping-cart"></i> <span className="badge badge-light">0</span></Nav.Link>
        <Nav.Link className="text-white" onClick={prop.signOut} href="#">Log Out</Nav.Link>
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
