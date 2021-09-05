import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { generateRefreshLink } from '../../Store/actions/authAction';
import Loading from '../layout/Loading';

class GenerateLink extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleClick = () => {
    this.props.generateRefreshLink(this.state);
    // window.location.href = '/password-recovery-message';
  };

  render() {
    const { auth } = this.props
    if(auth.loading && auth.authError === null) return <Loading />
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

        <button onClick={this.handleClick} className="btn btn-success w-25">
          Resend
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // const token = ownProps.match.params.token;
  return {
    // token,
    auth: state.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateRefreshLink: (cred) => dispatch(generateRefreshLink(cred)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateLink);
