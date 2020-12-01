/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './signIn.scss';
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../Store/actions/authAction';
import checkAuth from '../Helpers/check-auth';
import Loading from '../layout/Loading';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address1: '',
      address2: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      errors: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });

  };

  validatePassword() {
    const { password, confirmPassword } = this.state
    if (password !== confirmPassword) {
      return this.setState({ errors: 'Password do not match' });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.validatePassword()
    this.props.signUp(this.state);
    // e.target.reset();
  };


  render() {
    const { auth, authError } = this.props;
    const { errors } = this.state
    const isAuth = checkAuth.isAuth()
console.log(authError)
    if(auth.loading && authError === null) return <Loading />
    if(isAuth) return <Redirect to="/" />

    let message = ""
    if (auth.payload.status === 201) message = "We've sent you an email in the provided email address, kindly follow to activate your account"

    return (
      <div className="signin">

        <h1 className="welcome">WELCOME to NomaEx</h1>
        <hr className="line" />

        <div className="form-div">
          {/* Default form register */}
          <h3 className="p-3">Create User Account</h3>

          <form className="text-center border border-light p-5 rounded bg-light" onSubmit={this.handleSubmit}>
            <p className="text-danger">{authError !== null ? authError.data.error : message }</p>

            <div className="form-group row text-left">
              {/* First name */}
              <label htmlFor="firstName" className="col-sm-4 col-form-label">First Name: </label>
              <div className="col-sm-8">
                <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First name" required pattern=".{3,}" title="First name should have at least 3 characters" onChange={this.handleChange} />
              </div>
            </div>

            {/* Last name */}
            <div className="form-group row text-left">
              <label htmlFor="lastName" className="col-sm-4 col-form-label">Last Name: </label>
              <div className="col-sm-8">
                <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Last name" required pattern=".{3,}" title="Last name should have at least 3 characters" onChange={this.handleChange} />
              </div>
            </div>

            {/* E-mail */}
            <div className="form-group row text-left">
              <label htmlFor="email" className="col-sm-4 col-form-label">Email: </label>
              <div className="col-sm-8">
                <input type="email" id="email" name="email" className="form-control" placeholder="E-mail" required onChange={this.handleChange} />
              </div>
            </div>

            {/* Address */}
            <div className="form-group row text-left">
              <label htmlFor="address1" className="col-sm-4 col-form-label"> Address Line 1:  </label>
              <div className="col-sm-8">
                <input type="text" id="address1" className="form-control" name="address1" placeholder="Address 1" required pattern=".{10,}" title="Address should have at least 10 characters" onChange={this.handleChange} />
              </div>
            </div>

            {/* Address */}
            <div className="form-group row text-left">
              <label htmlFor="address2" className="col-sm-4 col-form-label">Address Line 2: </label>
              <div className="col-sm-8">
                <input type="text" id="address2" className="form-control" name="address2" placeholder="Address 2" pattern=".{3,}" title="Address 2 should have at least 3 characters" onChange={this.handleChange} />
              </div>
            </div>


            {/* State */}
            <div className="form-group row text-left">
              <label htmlFor="state" className="col-sm-4 col-form-label">State: </label>
              <div className="col-sm-8">
                <input type="text" id="state" className="form-control" name="state" placeholder="State" required pattern=".{5,}" title="State should have at least 5 characters" onChange={this.handleChange} />
              </div>
            </div>

            {/* Phone number */}
            <div className="form-group row text-left">
              <label htmlFor="phoneNumber" className="col-sm-4 col-form-label">Contact Number: </label>
              <div className="col-sm-8">
                <input type="tel" id="phoneNumber" className="form-control" name="phoneNumber" placeholder="Phone" required pattern=".{11,11}" title="Phone Number should have just 11 Digits" onChange={this.handleChange} />
              </div>
            </div>


            {/* Password */}
            <div className="form-group row text-left">
              <label htmlFor="password" className="col-sm-4 col-form-label">Password: </label>
              <div className="form-group col-sm-8">
                <input type="password" id="password" className="form-control" placeholder="Password" required
                  pattern=".{7,}" aria-describedby="defaultRegisterFormPasswordHelpBlock" onChange={this.handleChange} />
                <small id="defaultRegisterFormPasswordHelpBlock" className="form-text text-muted mb-4">
                  At least 7 characters
                </small>
              </div>
            </div>


            <div className="form-group row text-left">
              <label htmlFor="confirmPassword" className="col-sm-4 col-form-label">Confirm Password: </label>
              <div className="col-sm-8">
                <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required
                  pattern=".{7,}" aria-describedby="defaultRegisterFormPasswordHelpBlock" onChange={this.handleChange} />
                <label htmlFor="errror" className="text-danger">
                  {errors ? errors : ''}
                </label>
              </div>
            </div>

            {/* Sign up button */}
            <button className="btn btn-success btn-lg" type="submit">Sign Up</button>

          </form>
        </div>

        {/* Sign In */}
        <p className="text-center text-dark existing-account">Already have an account?
                <Link to="/signin" > &nbsp; Sign In</Link>
        </p>

      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (cred) => dispatch(signUp(cred))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
