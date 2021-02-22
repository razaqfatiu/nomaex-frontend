import React, { Component } from 'react'
import { authenticate } from '../../Store/actions/authAction'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
  // componentWillMount() {
  // }
  componentWillMount(){
    this.props.authenticate()
  }

  render() {
    const { auth } = this.props
    const { payload } = auth
    // if(payload.userId === undefined ) return <Redirect to="/signup" />
    // if(payload.userId !== undefined) return 
    return (
    <Redirect to="/" />
      // <div className="text-center">Redirecting...</div>
    )
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
    authenticate: () => dispatch(authenticate())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
