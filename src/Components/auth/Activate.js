import React, { Component } from 'react';
import { activateAccount } from '../../Store/actions/authAction';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';

class Activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
    };
  }
  componentDidMount() {
    this.props.activateAccount(this.state);
  }
  render() {
    const { auth } = this.props;
    const { payload, authError } = auth;
    if (auth.loading && auth.authError === null) return <Loading />
    if (authError && authError.request.status === 401)
      return (
        <div className="text-center">
          <h5>
            {authError && authError.data !== undefined
              ? authError.data.error
              : ''}
          </h5>
          {/* <a className="bg-success" href='/signin'><h4>Click here to continue</h4></a> */}
          <button className="bg-danger">
            <a href="/" className="text-white">
              Resend activation link
            </a>
          </button>
        </div>
      );
    return (
      <div className="text-center">
        <h5>{payload && payload.message !== false ? payload.message : ''}</h5>
        
        <br />
        <a className="bg-success" href="/signin">
          <h4>Click here to continue</h4>
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const token = ownProps.match.params.token;
  return {
    token,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateAccount: (cred) => dispatch(activateAccount(cred)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activate);
