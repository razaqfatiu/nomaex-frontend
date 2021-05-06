import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { resendActivationLink } from '../../Store/actions/authAction';
import Loading from '../layout/Loading';
import './signIn.scss';

class ResendVerificationLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleResendLink = (e) => {
    e.preventDefault();
    this.props.resendActivationLink(this.state);
  }

  render() {
    const { auth } = this.props
    if(auth.loading) return <Loading />

    if(auth.payload.status && auth.payload.status === 200) return <Redirect to='/signin' />

    return (
      <div className="m-4 text-center">
      <h4>Please provide your email</h4>
      <br />
      <div className="text-center d-flex justify-content-center">
        <input
          id="email"
          type="email"
          required
          className="form-control col-lg-6"
          placeholder="Input your email"
          onChange={this.handleChange}
        />
      </div>
      <br />

      <button onClick={this.handleResendLink} className="btn btn-success w-25">
        Resend
      </button>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resendActivationLink: (cred) => dispatch(resendActivationLink(cred)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResendVerificationLink);
