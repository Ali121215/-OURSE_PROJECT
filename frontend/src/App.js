import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/user/login.component.jsx";
import Register from "./components/user/register.component.jsx";
import Home from "./components/home.component.jsx";
import Profile from "./components/user/profile.component.jsx";
import Categories from "./components/category/categories.component.jsx";
import NewCategory from "./components/category/new-category.component.jsx";
import UpdateCategory from "./components/category/update-category.component.jsx";
import Products from "./components/product/products.component.jsx";
import NewProduct from "./components/product/new-product.component.jsx";
import UpdateProduct from "./components/product/update-product.component.jsx";
import BoardUser from "./components/board/board-user.component.jsx";
import BoardManager from "./components/board/board-manager.component.jsx";
import BoardAdmin from "./components/board/board-admin.component.jsx";
import BoardWaiter from "./components/board/board-waiter.component.jsx";
import BoardCashier from "./components/board/board-cashier.component.jsx";
import BoardChef from "./components/board/board-chef.component.jsx";
import Update from "./components/user/update.component";
import createOrder from "./components/order/createOrder.component";
import Orders from "./components/order/orders.component";
import RequestRole from "./components/user/requestRole.component.jsx";

import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink } from 'mdbreact';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showWaiterBoard: (user.roles.includes("ROLE_WAITER") || user.roles.includes("ROLE_ADMIN")),
        showCashierBoard: (user.roles.includes("ROLE_CASHIER") || user.roles.includes("ROLE_ADMIN")),
        showChefBoard: (user.roles.includes("ROLE_CHEF") || user.roles.includes("ROLE_ADMIN")),
        showManagerBoard: (user.roles.includes("ROLE_MANAGER") || user.roles.includes("ROLE_ADMIN")),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showOrdersBoard: (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_MANAGER")),
        showCategory: (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_MANAGER")),
        showUserBoard: user.roles.includes("ROLE_USER")
      });
    }
  }

  logOut() {
    AuthService.logout();
    window.location.href = "/"
  }

  render() {
    const color = {backgroundColor: '#212529'}
    //const container = {height: 1300}
    const { currentUser, showWaiterBoard, showCashierBoard, showChefBoard, showManagerBoard, showOrdersBoard, showCategory } = this.state;

    return (
      <div className="">
        
        <header>
        <MDBNavbar style={color} fixed="top" dark expand="md">
              <MDBContainer>
                <MDBNavbarBrand href="/">
                  <strong>Restaurant</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
                  <MDBNavbarNav left>

                    <MDBNavItem active>
                      <MDBNavLink to="/">Home</MDBNavLink>
                    </MDBNavItem>

                    {showManagerBoard &&
                    <MDBNavItem>
                      <MDBNavLink to="/manager">Manager</MDBNavLink>
                    </MDBNavItem>
                    }

                    {showWaiterBoard &&
                    <MDBNavItem>
                      <MDBNavLink to="/waiter">Waiter</MDBNavLink>
                    </MDBNavItem>
                    }

                    {showChefBoard &&
                    <MDBNavItem>
                      <MDBNavLink to="/chef">Chef</MDBNavLink>
                    </MDBNavItem>
                    }

                    {showCashierBoard &&
                    <MDBNavItem>
                      <MDBNavLink to="/cashier">Cashier</MDBNavLink>
                    </MDBNavItem>
                    }

                    {currentUser &&
                    <MDBNavItem>
                      <MDBNavLink to="/user">Your Orders</MDBNavLink>
                    </MDBNavItem>
                    }
                  </MDBNavbarNav>

                  <MDBNavbarNav right>

                    {showOrdersBoard &&
                    <MDBNavItem>
                        <MDBNavLink to="/orders">Orders</MDBNavLink>
                    </MDBNavItem>
                    }     

                    {showCategory &&
                    <MDBNavItem>
                      <MDBNavLink to="/category">Categories</MDBNavLink>
                    </MDBNavItem>
                    }
                    
                    {showOrdersBoard &&
                    <MDBNavItem>
                      <MDBNavLink to="/product">Products</MDBNavLink>
                    </MDBNavItem>
                    }
  
                  </MDBNavbarNav>

                  {currentUser ? (
                  <MDBNavbarNav right>
                  
                    <MDBNavItem>
                      <MDBNavLink to="/profile">{currentUser.username}</MDBNavLink>
                    </MDBNavItem>

                    <MDBNavItem>
                      <MDBNavLink to="/" onClick={this.logOut}>LogOut</MDBNavLink>
                    </MDBNavItem>
                    
                  </MDBNavbarNav>
                  ) : (
                    <MDBNavbarNav right>
                  
                    <MDBNavItem>
                      <MDBNavLink to="/register">Register</MDBNavLink>
                    </MDBNavItem>

                    <MDBNavItem>
                      <MDBNavLink to="/login">LogIn</MDBNavLink>
                    </MDBNavItem>
                    
                  </MDBNavbarNav>)}

                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
          </header>

        
        <div>
        <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/category" component={Categories} />
            <Route exact path="/category/add" component={NewCategory} />
            <Route exact path="/category/:id" component={UpdateCategory} />
            <Route exact path="/product" component={Products} />
            <Route exact path="/product/add" component={NewProduct} />
            <Route exact path="/product/:id" component={UpdateProduct} />
            <Route exact path="/order/add" component={createOrder} />
            <Route exact path="/orders" component={Orders} />
            <Route path="/user/:id" component={Update} />
            <Route path="/user" component={BoardUser} />
            <Route path="/requestRole" component={RequestRole} />
            <Route path="/waiter" component={BoardWaiter} />
            <Route path="/cashier" component={BoardCashier} />
            <Route path="/chef" component={BoardChef} />
            <Route path="/manager" component={BoardManager} />
            <Route path="/admin" component={BoardAdmin} />
            </Switch>
        </div>

        <footer className="footer">
          <div className="container">
            <span className="text-muted">@ Vietnamese Restaurant</span>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
