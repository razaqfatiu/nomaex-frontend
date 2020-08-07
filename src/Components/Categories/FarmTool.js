import React, { Component } from 'react'
import { getProductsByCategory } from '../../Store/actions/productAction'
import Loading from '../layout/Loading'
import { connect } from 'react-redux'
import { Button, Nav, Card, Container, Row, Col, CardGroup, ButtonGroup, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import '../Product/Product.scss'

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
      <Container className="product-div">
        <h2 className="text-center" >FARM TOOLS</h2>
        <hr />
        <Row>
          {/* className="overflow-autos" */}
          <CardGroup className="justify-content-center ">
            {products && products.map((product) => (
              <Col className="mb-4" xs={12} sm={12} md={12} lg={4}>
                <Card className="text-center card" style={{ width: '20rem', height: '30rem' }}>
                  {product && product.Product_images.map((Product_image, i) => (
                    (Product_image && i === 0) ? <Card.Img key={Product_image.imageId} className="p-2" variant="top" src={Product_image.imageUrl} alt="Card image cap" height="200" /> : ''))}
                  {/* {product.Product_images.map(Product_image => ((Product_image) ? <Card.Img key={Product_image.imageId} className="p-2" variant="top" src={Product_image.imageUrl} alt="Card image cap" /> : ''))} */}

                  <Card.Body>
                    <Link key={product.productId} to={`/products/${product.productId}`}>
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
                    <Button variant="success">
                      <FontAwesomeIcon icon={faCartArrowDown} />
                      {' '} Add to Cart {' '}
                      <span className="badge badge-light">{0}</span>
                    </Button>


                    {/* <Card.Link className="bg-danger p-2 rounded" href="#">Edit Product</Card.Link>
                        <Card.Link className="bg-success p-2 rounded" href="#">Delete Product</Card.Link> */}
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

const mapStateToProps = (state) => {
  return {
    product: state.product,
    productError: state.product.productError,
    // ProductImages: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsByCategory: (categoryId) => dispatch(getProductsByCategory(categoryId)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(FarmTool)

