import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/AddProduct";
import AddCategorie from "./components/AddCategorie";

import UpdateProduct from "./components/UpdateProduct";
import ProductsList from "./components/ProductsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/categorie/add"} className="nav-link">
             Categorie Add
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/product/add"} className="nav-link">
             Product Add
            </Link>
          </li>

        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/"]} component={ProductsList} />
          <Route exact path="/product/add" component={AddProduct} />
          <Route exact path="/categorie/add" component={AddCategorie} />
          <Route path="/product/:id" component={UpdateProduct} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
