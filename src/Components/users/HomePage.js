import React, { Component } from 'react';
import './homepage.scss'

// import Image2 from '../../images/nomaex-5.jpg'
import Image3 from '../../images/nomaex-4.jpg'
import Image4 from '../../images/nomaex-7.jpg'

export class HomePage extends Component {
    render() {
        return (


        <div id="slider">
            <figure>
                <img src={Image3} alt />
                <img src={Image4} alt  />
                <img src={Image4} alt />
                <img src={Image4} alt />
                <img src={Image4} alt />
            </figure>
        </div>


        )
    }
}

export default HomePage;
