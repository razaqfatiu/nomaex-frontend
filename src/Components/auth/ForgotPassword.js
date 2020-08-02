import React, { Component } from 'react'
import { connect } from 'react-redux'
import { forgotPassword } from '../../Store/actions/authAction'
import { Redirect } from 'react-router-dom'

class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.ForgotPassword(this.state)
        // e.target.reset()
    };

    render() {
        const { auth, authError } = this.props
        console.log(auth)
        if (auth.payload.status === 200) return <Redirect to="/password-recovery-message" />

        return (
            <section id="cover" className="min-vh-100">
                <div id="cover-caption">
                    <div className="container">
                        <div className="row text-dark">
                            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                                <h3 className=" py-2">Forgot your password?</h3>
                                <p>Enter your email address to reset your password. You may need to check your spam folder or unblock no-reply@nomaex.com.</p>
                                {(authError) ? <p className="text-danger">User not Found</p> : ''}
                                <div className="px-2">
                                    <form action="" className="justify-content-center" id="forgot-password-form" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label className="sr-only">Name</label>
                                            <input type="email" id="email" className="form-control email" placeholder="user@test.com" onChange={this.handleChange} required />
                                        </div>
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


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        authError: state.auth.authError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ForgotPassword: (cred) => dispatch(forgotPassword(cred))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
