import React, { Component } from 'react'
import './homes.scss'
import firstSlide from '../../images/Backgrounds/harvest.jpg'
import secondSlide from '../../images/Backgrounds/cereal.jpg'
import thirdSlide from '../../images/Backgrounds/greenGrass.jpg'
import cock from '../../images/Backgrounds/cock.jpg'
import cow from '../../images/Backgrounds/cow.jpg'
import fruit from '../../images/Backgrounds/cock.jpg'
import poultry from '../../images/Backgrounds/chicken.jpg'
import tubers from '../../images/Backgrounds/tubers.jpg'
import vegs from '../../images/Backgrounds/vegs.jpg'

import { Link } from 'react-router-dom'



export default class Homes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [
        { cat: 'cereal', img: secondSlide, title: 'Shop in Cereals' },
        { cat: 'fruit', img: fruit, title: 'Shop in Fruits' },
        { cat: 'animal', img: cow, title: 'Shop in Livestock' },
        { cat: 'poultry', img: poultry, title: 'Shop in Poultry' },
        { cat: 'tubers', img: tubers, title: 'Shop in Tubers' },
        { cat: 'vegetables', img: vegs, title: 'Shop in Vegetables' }]
    }
  }
  render() {
    return (
      <div className="main-ho">

        {/* Header Slides */}
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="first-slide" src={firstSlide} alt="First slide" />
              <div className="container">
                <div className="carousel-caption text-left">
                  <h2>NOMAEX Farm</h2>
                  <p>Buy the freshly Harvested Farm Products</p>
                  <p><Link to="/signin"><button type="button" className="btn btn-primary btn-lg" >Sign In</button></Link></p>
                </div>

              </div>
            </div>
            <div className="carousel-item">
              <img className="second-slide" src={secondSlide} alt="Second slide" />
              <div className="container">
                <div className="carousel-caption text-left">
                  <h2>NOMAEX Farm</h2>
                  <p>NO. 1 Online farm products supplier in Nigeria</p>
                  <p><Link to="/signup"><button type="button" className="btn btn-primary btn-lg" >Signup</button></Link></p>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <img className="d-block w-100" src={thirdSlide} alt="Third slide" />
              <div className="container">
                <div className="carousel-caption text-left">
                  <h2>NOMAEX Farm</h2>
                  <p>We have the best in stock for you.</p>
                  <p><Link to="/signup"><button type="button" className="btn btn-primary btn-lg" >Signup</button></Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Featured Products Title */}

        <div className="container-fluid padding">
          <div className="row featured-title text-center">
            <div className="col-12">
              <h1>FEATURED PRODUCTS</h1>
            </div>
          </div>
        </div>


        {/* Featured Products */}
        <div className="container-fluid add-padd row d-flex justify-content-center ">
          {this.state.products.map((product, index) => (
            // <div className="text-center card mb-3 cd-pr" key={index}>
            <div className="text-center mb-3 card col-sm-12  col-md-6  col-lg-4  col-xl-3  align-items-stretch cd-pr" key={index}>
              <Link to={'/categories/' + product.cat}>

                <img className="card-img-top img-responsive" src={product.img} alt="Card cap" height="300" />
                <div className="card-body">
                  <h3 className="card-title m-3">{product.title}</h3>
                  {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                  {/* <a href="#" className="btn btn-primary">Shop</a> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

    )
  }
}
