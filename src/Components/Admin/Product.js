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


class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: null,
      quantity: 1,
      msg: ''
    }
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  // componentDidUpdate(){
  //   this.props.getAllProducts()
  // }

  handleAddToCart = (event) => {
    if (!checkAuth.isAuth()) this.props.history.push('/signin')
    const productId = event.target.getAttribute('data-key')
    const quantity = 1;
    const prod = { productId, quantity }
    event.target.style.background = '#094160'
    return this.props.addItemsToCart(prod)
    // return this.setState({ msg: 'Item successfully added to cart', productId })
  }

  render() {
    const { product } = this.props
    const { products } = product

    if (product.loading) return <Loading />
    if (!product.loading) {

      return (
        <Container fluid className="product-div">
          <h2 className="text-center" >ALL PRODUCTS</h2>
          <hr />
          <Row>
            {/* className="overflow-autos" */}
            <CardGroup className="justify-content-center">
              {products && products.map((product) => (
                <Col key={product.productId} className="mb-2 justify-content-center" xs={12} sm={6} md={4} lg={3}>
                  <Card className="text-center card" style={{ width: '20rem', height: '22rem' }}>
                    {product && product.Product_images.map((Product_image, i) => (
                      (Product_image && i === 0) ? <Card.Img key={Product_image.imageId} className="p-2" variant="top" src={Product_image.imageUrl} alt="Card image cap" height="150" /> : ''))}
                    {/* {product.Product_images.map(Product_image => ((Product_image) ? <Card.Img key={Product_image.imageId} className="p-2" variant="top" src={Product_image.imageUrl} alt="Card image cap" /> : ''))} */}

                    <Card.Body>
                      <Link to={`/products/${product.productId}`}>
                        <Card.Title>
                          <span>&#8358;</span>
                          {' '}
                          {product.productPrice}
                        </Card.Title>
                        <Card.Text>
                          {(product['productDescription'].length > 95) ? `${product['productDescription'].slice(0, 90)} ...` : product['productDescription'].slice(0, 5)}
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
                </Col>
              ))}

            </CardGroup>
          </Row>
        </Container>
      )
    }
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