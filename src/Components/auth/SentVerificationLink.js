import React, { Component } from 'react';
import './signIn.scss';

export default class SetVerificationLink extends Component {
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
        <button className="bg-danger">
          <a href="/generate/verify-link" className="text-white">
            Resend activation link
          </a>
        </button>
      </div>
    );
  }
}
