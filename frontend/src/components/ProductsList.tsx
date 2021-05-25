import React, { FunctionComponent, useState, useEffect } from "react";
import  ProductService from "../services/ProductService";
import { Link } from "react-router-dom";

const ProductsList : FunctionComponent = () => {
  const [products, setProducts] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  // const onChangeSearchName = e => {
  //   const searchText = e.target.value;
  //   setSearchName(searchText);
  // };

  const loadProducts = () => {
    ProductService.getAll()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const setActiveTutorial = (tutorial : any, index : number) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const deleteProduct = (id : string) => {
    ProductService.remove(id)
      .then(response => {
        loadProducts();
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  console.log(currentTutorial)


  return (
    <div className="list row">
      <div className="col-md-12">
        <h4>Products List   </h4>

        <ul className="list-group">
          {products &&
            products.map((product :any, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(product, index)}
                key={index}
              >
                {product.name}  : {product.price}
                <div className="mt-3 ">


                <Link
              to={"/product/" + product.id}
              className="btn btn-info me-3  "
              >
              Edit
            </Link>
            <button className="btn btn-danger" onClick={ () => deleteProduct(product.id)}>
            Delete
          </button>
              </div>
              </li>
            ))}
        </ul>

      </div>
    </div>
  );
};

export default ProductsList;
