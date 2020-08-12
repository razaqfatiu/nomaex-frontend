import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllProducts } from '../../Store/actions/productAction'
import Loading from '../layout/Loading'
import { Button, Nav, Card, Container, Row, Col, CardGroup, ButtonGroup, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from 'react-router-dom'
import './Product.scss'
import { addItemsToCart } from '../../Store/actions/cartAction';
import checkAuth from '../Helpers/check-auth';
import { formatCurrency } from '../Helpers/currency-formatter';


class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: null,
      quantity: 1,
      msg: ''
    }
  }

  componentWillMount() {
    this.props.getAllProducts()
  }

  handleAddToCart = (event) => {
    if (!checkAuth.isAuth()) this.props.history.push('/signin')
    const productId = event.target.getAttribute('data-key')
    const quantity = 1;
    const prod = { productId, quantity }
    event.target.style.background = '#094160'
    return this.props.addItemsToCart(prod)
  }

  render() {
    const { product } = this.props
    const { products } = product
    if (products && products.length === 0) return <h2 className="text-center">No Product Available</h2>
    if (product && product.loading) return <Loading />
    return (
      <Container fluid className="product-div">
        <h2 className="text-center">ALL PRODUCTS</h2>
        <hr />
        <div className="row d-flex justify-content-center">
          {products && products.map((product) => (
            <Card key={product.productId} className="text-center mb-3 card col-sm-6  col-md-4  col-lg-3  col-xl-2  d-flex align-items-stretch" style={{ width: '15rem', height: '25rem' }}>
              {product && product.Product_images.map((Product_image, i) => (
                (Product_image && i === 0) ? <Card.Img key={Product_image.imageId} className="p-2" variant="top" src={Product_image.imageUrl} alt="Card image cap" height="150" /> : ''))}

              <Card.Body>
                <Link to={`/products/${product.productId}`}>
                  <Card.Title className="product-text-size">
                    {formatCurrency(product.productPrice)} 
                    &nbsp; &nbsp;
                    <strike><span>
                      {formatCurrency(product.productPrice)}
                    </span></strike>
                  </Card.Title>
                  <Card.Text className="text-center product-text-size">
                    {/* {product.productName} */}
                    {(product['productDescription'].length > 95) ? `${product['productDescription'].slice(0, 60)}...` : product['productDescription'].slice(0, 5)}
                  </Card.Text>
                </Link>
                <br />
                <Button variant="success" data-key={product.productId} onClick={this.handleAddToCart}>
                  <FontAwesomeIcon icon={faCartArrowDown} />
                  {' '} Add to Cart {' '}
                </Button>
                <br />
                {/* <small className="text-warning">{(this.state.msg && this.state.productId === product.productId) ? this.state.msg : ''}</small> */}
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    )
  }
}
// }

const mapStateToProps = (state) => {
  return {
    product: state.product,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    addItemsToCart: (item) => dispatch(addItemsToCart(item))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product)