import React, { Component } from 'react';
import './ProductUpload.scss';
import { connect } from 'react-redux';
import { getCategories } from '../../Store/actions/categoryAction';
import Loading from '../layout/Loading';
import { createNewProduct } from '../../Store/actions/productAction';
import allNigeriaStates from '../Helpers/all-states';
const axios = require('axios').default;

class ProductUpload extends Component {
  constructor(props) {
    super(props);
    this.data = null;
    this.state = {
      productName: '',
      productPrice: '',
      productDescription: '',
      categoryId: '',
      unit: '',
      cost: 0,
      state: '',
      country: 'Nigeria',
      eta: '',
      productImage: [],
      productShipping: '',
      invalidImage: '',
      productDiscount: 0.0,
      message: null,
    };
  }

  componentWillMount() {
    // console.log(this.props.getCategories())
    this.props.getCategories();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onSelect = (event) => {
    const selectedIndex = event.target.options.selectedIndex;
    this.setState({
      categoryId: event.target.options[selectedIndex].getAttribute('data-key'),
    });
    // console.log(this.state.categoryId)
  };

  onSelectState = (event) => {
    // const selectedIndex = event.target.options.selectedIndex;
    this.setState({
      state: event.target.value,
    });
  };

  onChangeFile = (event) => {
    const imageFiles = event.target.files;
    this.setState({ productImage: imageFiles });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.data = new FormData(document.getElementById('productForm'));
    this.data.append('categoryId', this.state.categoryId);
    if (this.state.invalidImage) return false;
    this.props.createNewProduct(this.data);
    e.target.reset()
  };

  render() {
    const { categories: categoriesState, product } = this.props;
    const { categories } = categoriesState;
    let message;

    const { productError } = product;

    if (!product.loading && product.products.length > 0) {
      message = product.products.data.message;
    }
    if (product.loading && productError === null) return <Loading />;
    // if (product &&( product.loading && productError === null)) return <Loading />
    if (categoriesState.loading && categoriesState.categoryError === null) return <Loading />;

    return (
      <div className="main">
        <h1>UPLOAD PRODUCT</h1>
        <hr />
        <form
          className="text-left border rounded border-light bg-light"
          id="productForm"
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group row">
            <label htmlFor="productName" className="col-sm-4 col-form-label">
              Product Name:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="productName"
                id="productName"
                placeholder="Product Name"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="productDescription"
              className="col-sm-4 col-form-label"
            >
              Product Description:
            </label>
            <div className="col-sm-8">
              <textarea
                className="form-control"
                name="productDescription"
                id="productDescription"
                placeholder={
                  product.productDescription || 'Product Description'
                }
                onChange={this.handleChange}
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productPrice" className="col-sm-4 col-form-label">
              Product Price:
            </label>
            <div className="col-sm-8">
              <input
                type="number"
                className="form-control"
                name="productPrice"
                id="productPrice"
                placeholder="Product Price"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="productDiscount"
              className="col-sm-4 col-form-label"
            >
              Product Discount:
            </label>
            <div className="col-sm-8">
              <input
                type="number"
                className="form-control"
                name="productDiscount"
                id="productDiscount"
                placeholder="Product Discount"
                step=".01"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="product-shipping"
              className="col-sm-4 col-form-label"
            >
              Product Shipping Cost:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="cost"
                id="cost"
                placeholder="Product Shipping Cost"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="product-shipping-state"
              className="col-sm-4 col-form-label"
            >
              Product Shipping State:
            </label>
            <div className="col-sm-8">
              <select
                id="state"
                className="form-control"
                name="state"
                id="state"
                onChange={this.onSelectState}
              >
                <option defaultValue>Choose...</option>
                {allNigeriaStates.map((state, i) => (
                  <option key={i} data-key={i}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="product-shipping-country"
              className="col-sm-4 col-form-label"
            >
              Product Shipping Country:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="country"
                id="country"
                placeholder="Product Shipping Country"
                value="Nigeria"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="eta" className="col-sm-4 col-form-label">
              Expected Time of Arrival:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="eta"
                id="eta"
                placeholder="Expected Time of Arrival in Days "
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="categories" className="col-sm-4 col-form-label">
              Category:
            </label>
            <div className="col-sm-8">
              <select
                id="categories"
                className="form-control"
                name="categories"
                id="categoryId"
                onChange={this.onSelect}
              >
                <option defaultValue>Choose...</option>
                {categories.map((category) => (
                  <option
                    key={category.categoryId}
                    data-key={category.categoryId}
                  >
                    {category.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="unit" className="col-sm-4 col-form-label">
              Unit:
            </label>
            <div className="col-sm-8">
              <input
                type="number"
                className="form-control"
                name="unit"
                id="unit"
                placeholder="Available Unit"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productImage" className="col-sm-4 col-form-label">
              Product Images
            </label>
            <div className="col-sm-8">
              <input
                type="file"
                className="form-control"
                name="productImage"
                id="productImage"
                required
                multiple
                accept=".png, .jpg, .jpeg"
                onChange={this.onChangeFile}
              />
              {/* <small id="invalidImage" class="form-text text-danger">{this.state.invalidImage}</small> */}
            </div>
          </div>

          <div className="text-center">
            <button
              className="btn btn-success btn-lg my-4"
              type="submit"
              id="upload"
            >
              Upload
            </button>
          </div>

          <h5 className="text-success mb-5 product-message">
            {message ? message : ''}
          </h5>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    categories: state.category,
    // product: state.product.products.data,
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    createNewProduct: (cred) => dispatch(createNewProduct(cred)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpload);
