import React, { FunctionComponent,useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import  ProductService from "../services/ProductService";
import CategorieSelect from "./CategorieSelect"

const UpdateProduct = (props :  RouteComponentProps ) => {
  
  const initialProductState = {
    id: null,
    name:"",
    price: 0,
    categorieId:null,
  };

  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState("");

  const [categorieId, setCategorieValue] = useState<String | null>(null)

  


  const getProduct = (id : string) => {
    ProductService.get(id)
      .then(response => {
        setCurrentProduct(response.data);
        const {categorieId : currentCatId} = response.data
        setCategorieValue(currentCatId)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  const {id : idParams} : any =   props.match.params
  useEffect(() => {
    getProduct(idParams);
  }, [idParams]);

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };


  const updateProduct = () => {
    var data = {
      id: parseInt(String(currentProduct.id)),
      name: currentProduct.name,
      price: parseFloat(String(currentProduct.price)),
      categorieId
    };
    ProductService.update(String(currentProduct.id), data)
      .then(response => {
        console.log(response.data);
        setMessage("The Product was updated successfully!");
        setTimeout(()=> props.history.push("/"),1e3)
      })
      .catch(e => {
        console.log(e);
      });
  };



  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Product</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>
                <strong>Categorie:</strong>
              </label>
                <CategorieSelect  value={categorieId} onChange={(e: React.FormEvent<HTMLInputElement>) => {
                   
                  setCategorieValue(e.currentTarget.value)
                }}/>
            </div>
          </form>



          <button
            type="submit"
            className="btn btn-success"
            onClick={updateProduct}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please choose Product...</p>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
