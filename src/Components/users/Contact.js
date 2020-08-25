import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone, faHome } from "@fortawesome/free-solid-svg-icons"
// import { emailClient } from '../Helpers/email'


export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      body: ''
    }
  }

  handleSendEmail = () => {
    const message = {
      text: 'i hope this works',
      from: 'you <username@your-email.com>',
      to: 'someone <someone@your-email.com>, another <another@your-email.com>',
      cc: 'else <else@your-email.com>',
      subject: 'testing emailjs',
      attachment: [
        { data: '<html>i <i>hope</i> this works!</html>', alternative: true },
        { path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip' },
      ],
    };
  }
  render() {
    return (
      <div>
        <section className="resume-section p-4 p-lg-5 text-center" id="contact">
          <div className="my-auto">
            <h2 className="mb-4"> Contact US</h2>

            <ul className="fa-ul mb-4 ml-3">
              <li id="mail-address" className="p-3">
                {/* <!--               Replace with your email address --> */}
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 contact-icons" />nomeax@nomeax.com
              </li> {' '}
              <li className="p-3">
                <FontAwesomeIcon icon={faPhone} className="mr-2 contact-icons" />+2348142396523
            </li>
              <li className="p-3">
                <FontAwesomeIcon icon={faHome} className="mr-2 contact-icons" />Lagos, Nigeria
            </li>
            </ul>

            <p>
              Use provided contact information or leave your message below and we will be back to you as soon as
              possible.
          </p>
              <a href="mailto:nomaex@nomaex.com">Send email</a>
            {/* <form
              className="contact-form d-flex flex-column align-items-center"
              action="https://formspree.io/youremail@mail.com"
              method="POST"
            >
              <div className="form-group w-75">
                <input
                  type="name"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  required
                />
              </div>
              <div className="form-group w-75">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  required
                />
              </div>

              <div className="form-group w-75">
                <textarea
                  className="form-control"
                  type="text"
                  placeholder="Message"
                  rows="7"
                  name="body"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-submit btn-info w-75">Submit</button>
            </form> */}
          </div>
        </section>
      </div>
    )
  }
}
