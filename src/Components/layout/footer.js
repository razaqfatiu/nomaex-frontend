import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faInstagram, } from "@fortawesome/free-brands-svg-icons"
import './footer.scss'
import { Navbar, Container, Row, Col, } from "react-bootstrap";


export default class Footer extends Component {
  render() {
    return (
      <Navbar className="footer-main-div" fixed="bottom">
        <Container fluid className="footer-div">
          {/* <Container> */}
          <Row className="Row">
            <Col className="text-left foot-left">
              <p className="footer-element">© {new Date().getFullYear()} NOMAEX</p>
            </Col>
            <Col className="text-right foot-right">
              <ul>
                <li>
                  <a target="__blank" href="https://web.facebook.com/nomaex/?_rdc=1&_rdr"><FontAwesomeIcon icon={faFacebookF} className="white-text mr-md-5 mr-3 footer-element" color="white" size="lg" /></a>
                </li>
                <li>
                 <FontAwesomeIcon target="__blank" icon={faTwitter} className="white-text mr-md-5 mr-3 footer-element" color="white" size="lg" />
                 
                </li>
                <li>
                   <a target="__blank" href="https://Instagram.com/noma_ex" ><FontAwesomeIcon icon={faInstagram} className="white-text mr-md-5 mr-3 footer-element" color="white" />
                    </a>
                </li>
              </ul>
            </Col>

          </Row>
          {/* </Container> */}
          {/* <div className="footer-copyright text-center py-3"></div> */}
          {/* <Link to="/">
            <FontAwesomeIcon icon={faFacebookF} className="white-text mr-md-5 mr-3 fa-2x" color="white" size="lg" />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} className="white-text mr-md-5 mr-3 fa-2x" color="white" size="lg" />
          </Link>

          <Link to="/">
            <FontAwesomeIcon icon={faLinkedin} className="white-text mr-md-5 mr-3 fa-2x" color="white" />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faInstagram} className="white-text mr-md-5 mr-3 fa-2x" color="white" />
          </Link> */}





        </Container>
      </Navbar>
    )
  }
}
