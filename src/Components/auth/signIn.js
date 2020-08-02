import React, { Component } from 'react';
import './signIn.scss';
import { signIn, authenticate } from '../../Store/actions/authAction'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../layout/Loading';
import checkAuth from '../Helpers/check-auth';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // errors: {}
    };
  }


  componentWillMount() {

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
    const { auth, authError, history } = this.props
    const { data } = auth.payload
    const isAuth = checkAuth.isAuth()
    const isAdmin = checkAuth.isAdmin()
    let error
    if (auth.payload.status === 200) {
      return <Redirect to='/' />
    }
    // if (isAuth) return <Redirect to='/' />
    if (authError !== null) {
      error = authError.data.error
    }
    return (
      <div className="signin">
        <h1 className="welcome">WELCOME BACK</h1>
        <hr className="line" />

        <div className="form-div">
          <form className="text-center border rounded border-light p-5 bg-light" onSubmit={this.handleSubmit}>

            <h2 className="p-3">Nomeax</h2>
            <p className="text-danger">{error ? error : ''}</p>
            {/* Email */}
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" className="form-control mb-4" placeholder="E-mail" onChange={this.handleChange} required />

            {/* Password */}
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control mb-4" placeholder="Password" onChange={this.handleChange} required />

            {/* error*/}

            <div className="d-flex justify-content-around">
              <div>
                {/* Forgot password */}
                <a href="/forgot-password">Forgot password?</a>
              </div>
            </div>

            {/* Sign in button */}
            <button className="btn btn-success btn-block my-4" type="submit" id="login">Sign in</button>
            <p>Do not have an account?
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
    authError: state.auth.authError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => dispatch(signIn(cred)),
    authenticate: () => dispatch(authenticate())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
