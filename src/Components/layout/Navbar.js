import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav, } from "react-bootstrap";
import './navbar.scss'
import SignedInLinks from './SignedInLinks';
import SignedOutLink from './SignedOutLink';
import { connect } from 'react-redux';
import { signOut } from '../../Store/actions/authAction';
import checkAuth from '../Helpers/check-auth';
import AdminSignedInLinks from './AdminSignedInLinks';
import { getUserCartItems } from '../../Store/actions/cartAction';
import { loadAuthCred } from '../../Store/localStorage';


class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      carts: [],
      no: this.props.cart.carts.length
    }
  }

  componentWillMount() {
    this.setState({ no: this.props.cart.carts.length })
  }

  componentDidMount() {
    if (checkAuth.isAuth()) this.props.getUserCartItems()
    this.setState({ isAuthenticated: checkAuth.isAuth() })
  }

  render() {
    const { auth } = this.props
    const isAuth = checkAuth.isAuth()
    const isAdmin = checkAuth.isAdmin()

    return (
      <Navbar
        bg=""
        className="navbar shadow-sm p-3 mb-5 rounded"
        expand
      >
        <Button variant="outline-success" onClick={this.props.toggle}>
          <FontAwesomeIcon icon={faAlignLeft} color="black" />
        </Button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {(auth.isLoggedIn || (!isAdmin && isAuth)) ? <SignedInLinks prop={this.props} /> :
            (auth.isLoggedIn || (isAuth && isAdmin)) ? <AdminSignedInLinks prop={this.props} />
              : <SignedOutLink />}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authError: state.auth.authError,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    getUserCartItems: () => dispatch(getUserCartItems())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
