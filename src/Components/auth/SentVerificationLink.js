import React, { Component } from 'react'
import './signIn.scss'

export default class SetVerificationLink extends Component {
  render() {
    return (
      <div className="sent-verification-link">
        <p>We have sent the Verification link to your email, kindly verify from your inbox and you might also want to check the search to the Junk/Spam folders</p>
      </div>
    )
  }
}
