import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute.js";
import AdminRoute from "./auth/AdminRoute.js";
import Signup from "./user/Signup.js";
import Signin from "./user/Signin.js";
import Home from "./core/Home.js";
import Menu from "./core/Menu.js";
import UserDashboard from "./user/UserDashboard.js";
import AdminDashboard from "./user/AdminDashboard.js";
import AddCategory from "./admin/AddCategory.js";
import AddProduct from "./admin/AddProduct.js";
import Shop from "./core/Shop.js";
import Product from "./core/Product.js";
import Cart from "./core/Cart.js";
import Orders from "./admin/Orders.js";
import Profile from "./user/Profile.js";
import ManageProducts from "./admin/ManageProducts.js";
import UpdateProduct from "./admin/UpdateProduct.js";
import SideNav from "./core/SideNav.js";
import Footer from "./core/Footer.js";


const Routes = () => {
	return (
		
		<BrowserRouter>
			<Menu/>
			<SideNav/>
			<Switch>
				<Route path="/" component={Home} exact/>
				<Route path="/signin" component={Signin} exact/>
				<Route path="/signup" component={Signup} exact/>
				<Route path="/shop" component={Shop} exact />
				<Route path="/product/:productId" component={Product} exact />
				<Route path="/cart" component={Cart} exact />
				<PrivateRoute path="/user/dashboard" component={UserDashboard} exact/>
				<PrivateRoute path="/profile/:userId" component={Profile} exact />
				<AdminRoute path="/admin/dashboard" component={AdminDashboard} exact/>
				<AdminRoute path="/create/category" component={AddCategory} exact/>
				<AdminRoute path="/create/product" component={AddProduct} exact/>
				<AdminRoute path="/admin/orders" component={Orders} exact/>
				<AdminRoute path="/admin/products" component={ManageProducts} exact/>
				<AdminRoute path="/admin/product/update/:productId" component={UpdateProduct} exact/>
			</Switch>
			<Footer/>
		</BrowserRouter>

	)
}

export default Routes;