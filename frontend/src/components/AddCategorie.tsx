import React, { FunctionComponent,useState } from "react";
import  CategorieService from "../services/CategorieService";


const AddProduct :FunctionComponent = () => {
  const initialProductState = {
    id: null,
    name: "",
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      name: product.name,
    };

    CategorieService.create(data)
      .then(response => {
        setProduct({
          id: response.data.id,
          name: response.data.name
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
       <h4>Categorie</h4>
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

          <button onClick={saveProduct} className="btn btn-success mt-3">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
