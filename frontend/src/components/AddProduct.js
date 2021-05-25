import React, { useState } from "react";
import  ProductService from "../services/ProductService";

import CategorieSelect from "./CategorieSelect"

const AddProduct = () => {
  const initialProductState = {
    id: null,
    name: "",
    price: 0,
    categorieId:null
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);
  const [categorieId, setCategorieValue] = useState(null)

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      name: product.name,
      price: parseFloat(product.price),
      categorieId
    };

    ProductService.create(data)
      .then(response => {
        setProduct({
          id: response.data.id,
          name: response.data.name,
          price: response.data.price
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
       <h4>Product</h4>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProduct}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={product.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              required
              value={product.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Categorie</label>
            <CategorieSelect onChange={e => {
                   
                   setCategorieValue(e.currentTarget.value)
                 }}/>
          </div>

          <button onClick={saveProduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
