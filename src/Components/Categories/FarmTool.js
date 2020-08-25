import React, { Component } from 'react'
import { getProductsByCategory } from '../../Store/actions/productAction'
import Loading from '../layout/Loading'
import { connect } from 'react-redux'
import { Button, Nav, Card, Container, Row, Col, CardGroup, ButtonGroup, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import '../Product/Product.scss'
import { addItemsToCart } from '../../Store/actions/cartAction';
import { formatCurrency } from '../Helpers/currency-formatter';
import { calcDiscountPrice } from '../Helpers/price-converters';

class FarmTool extends Component {

  componentWillMount() {
    this.props.getProductsByCategory(2)
  }

  render() {
    const { product, productError } = this.props
    const { products } = product
    if (productError !== null) return <h2 className="text-center">{productError.data.getProductsByCategory}</h2>
    if (product.loading) return <Loading />

    return (
      <Container fluid className="product-div">
        <h2 className="text-center" >FARM TOOLS</h2>
        <hr />
        <div className="row d-flex justify-content-left">
          {products && products.map((product) => (
            <Card key={product.productId} className="text-center mb-3 card col-sm-6  col-md-4  col-lg-3  col-xl-2  d-flex align-items-stretch" style={{ width: '15rem', height: '25rem' }}>
              {product && product.Product_images.map((Product_image, i) => (
                (Product_image && i === 0) ? <Card.Img key={Product_image.imageId} className="p-2" variant="top" src={Product_image.imageUrl} alt="Card image cap" height="150" /> : ''))}

              <Card.Body>
                <Link to={`/products/${product.productId}`}>
                  <Card.Title className="product-text-size">
                    {/* {formatCurrency(product.productPrice)}  */}
                    {formatCurrency(calcDiscountPrice(product.productPrice, product.productDiscount, 1))}
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
                {/* <div id='hideme-container'>
                  <div id='hideme'>
                    {(message) ? 'Added' : ''}
                    </div>
                </div> */}
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
const mapStateToProps = (state) => {
  return {
    product: state.product,
    productError: state.product.productError,
    cart: state.cart
    // ProductImages: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsByCategory: (categoryId) => dispatch(getProductsByCategory(categoryId)),
    addItemsToCart: (item) => dispatch(addItemsToCart(item))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FarmTool)

