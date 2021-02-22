import React, { Component } from 'react'
import { resetPassword } from '../../Store/actions/authAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../layout/Loading';

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPassword: '',
      verifyPassword: '',
      token: '',
      error: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  componentDidMount() {
    this.setState({
      token: this.props.token
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newPassword !== this.state.verifyPassword) {
      return this.setState({ error: 'password do not match' })
    }
    this.props.resetPassword(this.state)
  };

  render() {
    const { auth } = this.props
    if(auth.loading) return <Loading />

    if (auth.payload.status === 201) {
      document.getElementById("reset-password-form").reset();
      return <Redirect to="/signin" />
    }

    return (
      <section id="cover" className="min-vh-100">
        <div id="cover-caption">
          <div className="container">
            <div className="row text-dark">
              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                <h3 className=" py-2">Create new password?</h3>
                <p>Make sure the Password matches.</p>
                <div className="px-2">
                  <form action="" className="justify-content-center" id="reset-password-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label className="sr-only">New Password</label>
                      <input type="password" id="newPassword" onChange={this.handleChange} className="form-control" placeholder="New Password" required />
                    </div>
                    <div className="form-group">
                      <label className="sr-only">Verify Password</label>
                      <input type="password" id="verifyPassword" onChange={this.handleChange} className="form-control" placeholder="Verify Password" required />
                    </div>
                    <p className="text-danger"> {(this.state.error) ? this.state.error : ''}</p>
                    <button type="submit" className="btn btn-success btn-lg">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const token = ownProps.match.params.token;
  return {
    token,
    auth: state.auth,
    authError: state.auth.authError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (cred) => dispatch(resetPassword(cred))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
