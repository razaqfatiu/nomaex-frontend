import React, { Component } from 'react'
import { Navbar, Button, Nav, Form, FormControl } from "react-bootstrap";
import { getUserCartItems } from '../../Store/actions/cartAction';
import { connect } from 'react-redux';

class AdminSignedInLinks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carts: [],
    }
  }
  componentWillMount() {
    // this.setState({ carts: this.props.prop.cart.carts })
  }

  handleSignOut = () => {
    this.props.signOut()
  }

  render() {
    const { prop } = this.props
    const { cart } = prop
    return (
      <Nav className="ml-auto" navbar >
        <Nav.Link className="text-white" href="/admin/product-upload">Upload</Nav.Link>
        {/* <Nav.Link className="text-white" href="/">Products</Nav.Link> */}
        <Nav.Link className="text-white" href="/admin/store">Store</Nav.Link>
        <Nav.Link className="text-white" href="/cart">Cart <i className="fa fa-shopping-cart"></i> </Nav.Link>
        {/* <span className="badge badge-light">{carts && carts.length || 0}</span> */}
        <Nav.Link className="text-white" href="/admin/orders">Orders</Nav.Link>
        <Nav.Link className="text-white" onClick={prop.signOut} href="/signin"> Signout</Nav.Link>

      </Nav>
    )
  }
}


// const mapStateToProps = (state) => {
//   return {
//     // product: state.product,
//     cart: state.cart
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUserCartItems: () => dispatch(getUserCartItems())
//   }
// }


export default AdminSignedInLinks
// connect(mapStateToProps, mapDispatchToProps)();
