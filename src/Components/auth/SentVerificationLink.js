import React, { Component } from 'react';
import { resendActivationLink } from '../../Store/actions/authAction';
import './signIn.scss';

class SetVerificationLink extends Component {

  render() {
    return (
      <div className="sent-verification-link">
        <p>
          We have sent the Verification link to your email, kindly verify from
          your inbox, Junk/Spam folders
        </p>
        <br />
        <div>Kindly wait few moment before retry</div>
        <br />
        <button className="btn" onClick={this.handleResendLink}>
          <a href="/resend/verify-link" className="btn btn-warning text-white">
            Resend activation link
          </a>
        </button>
      </div>
    );
  }
}
export default SetVerificationLink;
