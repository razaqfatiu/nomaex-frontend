import React from 'react'

export default function ProductForm() {
  return (
    <form className="text-left border rounded border-light bg-light" id="productForm" >
    {/* onSubmit={this.handleSubmit} encType="multipart/form-data" */}

      {/* <div className="form-group row">
        <label htmlFor="productName" className="col-sm-4 col-form-label">Product Name:</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" name="productName" id="productName" placeholder="Product Name" onChange={this.handleChange} />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="productDescription" className="col-sm-4 col-form-label">Product Description:</label>
        <div className="col-sm-8">
          <textarea className="form-control" name="productDescription" id="productDescription" placeholder={product.productDescription || "Product Description"} onChange={this.handleChange} rows="3"></textarea>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="productPrice" className="col-sm-4 col-form-label">Product Price:</label>
        <div className="col-sm-8">
          <input type="number" className="form-control" name="productPrice" id="productPrice" placeholder="Product Price" onChange={this.handleChange} />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="productDiscount" className="col-sm-4 col-form-label">Product Discount:</label>
        <div className="col-sm-8">
          <input type="number" className="form-control" name="productDiscount" id="productDiscount" placeholder="Product Discount" step=".01" onChange={this.handleChange} />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="product-shipping" className="col-sm-4 col-form-label">Product Shipping Cost:</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" name="cost" id="cost" placeholder="Product Shipping Cost" onChange={this.handleChange} />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="product-shipping-state" className="col-sm-4 col-form-label">Product Shipping State:</label>
        <div className="col-sm-8">
          <select id="state" className="form-control" name="state" id="state" onChange={this.onSelectState} >
            <option defaultValue>Choose...</option>
            {allNigeriaStates.map((state, i) => (<option key={i} data-key={i} >{state}</option>))}
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="product-shipping-country" className="col-sm-4 col-form-label">Product Shipping Country:</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" name="country" id="country" placeholder="Product Shipping Country" value="Nigeria" onChange={this.handleChange} />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="eta" className="col-sm-4 col-form-label">Expected Time of Arrival:</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" name="eta" id="eta" placeholder="Expected Time of Arrival in Days " onChange={this.handleChange} />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="categories" className="col-sm-4 col-form-label">Category:</label>
        <div className="col-sm-8">
          <select id="categories" className="form-control" name="categories" id="categoryId" onChange={this.onSelect} >
            <option defaultValue>Choose...</option>
            {categories.map(category => (<option key={category.categoryId} data-key={category.categoryId} >{category.value}</option>))}
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="unit" className="col-sm-4 col-form-label">Unit:</label>
        <div className="col-sm-8">
          <input type="number" className="form-control" name="unit" id="unit" placeholder="Available Unit" onChange={this.handleChange} />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="productImage" className="col-sm-4 col-form-label">Product Images</label>
        <div className="col-sm-8">
          <input type="file" className="form-control" name="productImage" id="productImage" required multiple accept=".png, .jpg, .jpeg" onChange={this.onChangeFile} />

        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-success btn-lg my-4" type="submit" id="upload">Upload</button>

      </div> */}

    </form>

  )
}
