import React, { Component } from 'react'
import { activateAccount } from '../../Store/actions/authAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Activate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: this.props.token
    }
  }
  componentDidMount() {
    this.props.activateAccount(this.state)
  }
  render() {
    const { auth } = this.props
    const { payload, authError } = auth
    console.log(auth)

    return (
      <div className="text-center">
        <h5 >{(payload && payload.message !== false) ? payload.message : ''}</h5>
        <h5>{(authError && authError.data !== undefined) ? authError.data.error : ''}</h5>
        <br />
        <a className="bg-success" href='/signin'><h4>Sign in to continue</h4></a>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const token = ownProps.match.params.token;
  return {
    token,
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    activateAccount: (cred) => dispatch(activateAccount(cred))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activate);

