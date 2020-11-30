import React, { Component } from 'react';
import './signIn.scss';
import { signIn, authenticate } from '../../Store/actions/authAction'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import checkAuth from '../Helpers/check-auth';
import Loading from '../layout/Loading'

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
      // errors: {}
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleAuth = () => {
    this.props.authenticate()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
    e.target.reset()
    // this.handleValidation();
  };

  render() {
    const { auth, history } = this.props
    const { authError } = auth
    const { data } = auth.payload
    const isAuth = checkAuth.isAuth()
    const isAdmin = checkAuth.isAdmin()
    let error
    if(auth.loading && authError === null) return <Loading />
    if(isAuth) return <Redirect to="/" />
    if (auth.payload !== undefined && auth.payload.status === 200) {
      return <Redirect from="/signin" to='/auth' />
    }

    if (authError !== null) {
      error = authError.data.error || authError.data.message
    }

    return (
      <div className="signin">
        <h1 className="welcome">WELCOME BACK TO NomaEx</h1>
        <hr className="line" />

        <div className="form-div">
          <form className="container text-center border rounded border-light p-5 bg-light mb-5" onSubmit={this.handleSubmit}>

            <p className="text-danger">{error ? error : ''}</p>
            {/* Email */}
            <div className="form-group row text-left">
              <label htmlFor="email" className="col-sm-2 col-form-label" > <b> Email Address:</b></label>
              <div className="col-sm-10">
                <input type="email" id="email" className="form-control mb-4" placeholder="E-mail" onChange={this.handleChange} required />
              </div>
            </div>

            {/* Password */}
            <div className="form-group row text-left">
              <label htmlFor="password" className="col-sm-2 col-form-label"><b>Password:</b></label>
              <div className="col-sm-10">
                <input type="password" id="password" className="form-control mb-4" placeholder="Password" onChange={this.handleChange} required />
              </div>
            </div>

            {/* error*/}

            <div className="d-flex justify-content-around">
              <div>
                {/* Forgot password */}
                <a href="/forgot-password">Forgot password?</a>
              </div>
            </div>

            {/* Sign in button */}
            <button className="btn btn-success btn my-4" type="submit" id="login">Sign in</button>
            <p>Do not have an account? &nbsp;
                <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    // authError: state.auth.authError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => dispatch(signIn(cred)),
    authenticate: () => dispatch(authenticate())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
