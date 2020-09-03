import React, { Component } from 'react'
import { authenticate } from '../../Store/actions/authAction'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
  // componentWillMount() {
  // }
  componentDidMount(){
    // this.props.authenticate()
  }

  render() {
    const { auth } = this.props
    const { payload } = this.auth
    // if(payload.userId !== undefined ) return <Redirect to="/" />
    return (
      // <Redirect to="/signin" />
      <div></div>
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
