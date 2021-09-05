import React, { Component } from 'react'
import { Nav } from "react-bootstrap";
import { connect } from 'react-redux';
import { getUserCartItems } from '../../Store/actions/cartAction';


class AdminSignedInLinks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carts: this.props.cart.carts,
    }
  }
  componentWillMount() {
    // this.setState({ carts: this.props.prop.cart.carts })
    this.props.getUserCartItems()
  }

  handleSignOut = () => {
    this.props.signOut()
  }

  render() {
    console.log(this.props)
    const { cart, prop } = this.props
    const { carts } = cart
    // const { carts }  = this.state
console.log(this.state)
    return (
      <Nav className="ml-auto" navbar >
        <Nav.Link className="text-white" href="/admin/product-upload">Upload</Nav.Link>
        {/* <Nav.Link className="text-white" href="/">Products</Nav.Link> */}
        <Nav.Link className="text-white" href="/admin/store">Store</Nav.Link>
        <Nav.Link className="text-white" href="/cart">Cart <i className="fa fa-shopping-cart"> </i> <span className="badge badge-light"> {carts && carts.length || 0}</span> </Nav.Link>
        
        <Nav.Link className="text-white" href="/admin/orders">Orders</Nav.Link>
        <Nav.Link className="text-white" onClick={prop.signOut} href="/signin"> Signout</Nav.Link>

      </Nav>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    // product: state.product,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserCartItems: () => dispatch(getUserCartItems())
  }
}


// export default AdminSignedInLinks
export default connect(mapStateToProps, mapDispatchToProps)(AdminSignedInLinks);
