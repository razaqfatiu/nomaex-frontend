import React, { Component, } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Row, Col, Carousel, ButtonGroup } from "react-bootstrap";
import './Product.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
// import { saveState, loadState } from '../../Store/localStorage';
import { Link, Redirect } from 'react-router-dom';
import ProductUpdate from './ProductUpdate';
import Loading from '../layout/Loading';
import { getOneProduct, deleteAProduct } from '../../Store/actions/productAction';
import checkAuth from '../Helpers/check-auth';
import { addItemsToCart } from '../../Store/actions/cartAction';


class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: null,
      quantity: 1,
      active: false,
      isDeleted: false
    }
    // this.handleOnChange = this.handleOnChange.bind(this)
    // this.handleToggle = this.handleToggle.bind(this)
  }

  componentWillMount() {
    this.props.getOneProduct(this.props.productId)
    this.setState({ productId: parseInt(this.props.productId) })
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleAddToCart = (e) => {
    this.props.addItemsToCart(this.state)
  }

  handleToggle = (e) => {
    this.setState({ active: !this.state.active });
  }

  handleSelect = (selectedIndex, e) => {
    this.state.setIndex(selectedIndex);
  };

  handleDelete = () => {
    console.log('test')
    this.props.deleteAProduct(this.props.productId)
    this.setState({ isDeleted: true })
    return this.props.history.goBack()
    // < Redirect to = "/" />
  }

  render() {
    const { product: productState, history } = this.props
    const { products: product, productError } = productState
    const formatPrice = (number) => new Intl.NumberFormat('en-IN').format(number)

    const isAuth = checkAuth.isAuth()
    const isAdmin = checkAuth.isAdmin()

    // if (this.state.isDeleted)
    if (productError && productError.status === 404) return <h3 className="text-center">{productError.data.getOneProduct}</h3>
    if (product && product.length === 0) return <Loading />

    return (
      <Container className="product-details-container">
        <h2 className="text-center mb-3">{product[0].productName}</h2>
        <hr />
        <Row>
          <Col xs={12} sm={12} lg={6} className="product-details-left">
            <br />
            <Carousel>
              {product && product[0].Product_images.map(productImage => (
                <Carousel.Item key={productImage.imageId}>
                  <img
                    className="d-block w-100"
                    src={productImage.imageUrl}
                    alt={`Product ${productImage.imageId}re23782rhshf834fejsew9e JPG`}
                  />
                </Carousel.Item>

              ))}
            </Carousel>
          </Col>
          <Col xs={12} sm={12} lg={6} className="mt-5 text-left" >
            <div className="m-3">
              <span className="label text-left">Product Name: </span>
              <span>{product[0].productName}</span>
            </div>

            <div className="m-3">
              <span className="label text-left">Product Price: </span>
              <span><span>&#8358;</span>{(product[0].productDiscount == 0) ? formatPrice(product[0].productPrice) : `${formatPrice(product[0].productPrice * product[0].productDiscount)}`}</span>  &nbsp;&nbsp;&nbsp;
              <strike><span><span>&#8358;</span>{`${formatPrice(product[0].productPrice)}`}</span></strike>

            </div>
            <div className="m-3">
              <span className="label text-left">Product Discount: </span>
              <span>{`${product[0].productDiscount * 100}`}<span>&#37;</span></span>
            </div>
            <div className="m-3">
              <span className="label text-left">Product Quantity: </span>
              <span> {product[0].unit} </span>
            </div>

            <div className="m-3">
              <span className="label text-left">Product Description: </span>
              <span>{product[0].productDescription}</span>
            </div>

            <div className="m-3">
              <span className="label text-left">Shipping Cost: </span>
              <span><span>&#8358;</span> {formatPrice(product[0].ProductShipping.cost)}</span>
            </div>

            <div className="m-3">
              <span className="label text-left">Shipping From: </span>
              <span>{product[0].ProductShipping.state}, {product[0].ProductShipping.country}</span>
            </div>

            <div className="m-3 ">
              <span className="label text-left">Expected Time of Arrival: </span>
              <b><span className="text-success">{product[0].ProductShipping.eta} Days</span></b>
            </div>

            <div className="m-3 text-right">
              <label htmlFor="Quantity" >Quantity: &nbsp;</label>
              <input type="number" min="1" max={product[0].unit} id="quantity" name="quantity" size="30" defaultValue="1" required onChange={this.handleOnChange} />
            </div>
            <Button variant="success" className="m-5" onClick={this.handleAddToCart}>
              <FontAwesomeIcon icon={faCartArrowDown} />
              {' '} Add to Cart {' '}
            </Button>
          </Col>
        </Row>
        {isAuth && isAdmin ? <div>
          <Container className="text-center m-5">
            <ButtonGroup className="mb-2" size="lg">
              <Button variant="success" onClick={this.handleToggle} >
                Edit
              </Button>
              <Button variant="danger" onClick={this.handleDelete}>
                Delete
              </Button>
            </ButtonGroup>
          </Container>
          {this.state.active && <Container>
            <h3 className="text-center text-danger">{(productError && productError !== null) ? productError.data.response : ''}</h3>
            <ProductUpdate product={product} />
          </Container>}
        </div> : ''}

      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    product: state.product,
    productId: id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOneProduct: (pId) => dispatch(getOneProduct(pId)),
    addItemsToCart: (item) => dispatch(addItemsToCart(item)),
    deleteAProduct: (pId) => dispatch(deleteAProduct(pId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)