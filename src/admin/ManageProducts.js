import React, {useState, useEffect} from "react";
import {isAuthenticated} from "../auth/index.js";
import {Link} from "react-router-dom";
import {getProducts, deleteProducts} from "./apiAdmin.js";
import styled from "styled-components";
import moment from "moment";

const ManageProducts = () => {
	const [products, setProducts] = useState([]);

	const {user, token} = isAuthenticated();

	const loadProducts = () => {
		getProducts().then(data => {
			if(data.error){
				console.log(data.error)
			} else {
				setProducts(data);
			}
		});
	}

	const destroy = (productId) => {
		deleteProducts(productId, user._id, token).then(data => {
			if(data.error){
				console.log(data.error)
			} else {
				loadProducts();
			}
		})
	} 

	useEffect(() => {
		loadProducts();
	}, []);


	return (
		<ProductList>
			{products.map((product, index) => {
				return (
					<ProductDetails>
						<div className="product-name"><span className="header">Product Name:</span> {product.name}</div>
						<Link to={`/admin/product/update/${product._id}`}>
							Update
						</Link>
						<button onClick={() => destroy(product._id)}> Delete </button>
					</ProductDetails>
				)
			})}
		</ProductList>
	)
}

const ProductList = styled.div`
	width: 50%;
	margin: 100px auto;
`

const ProductDetails = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	box-shadow: 0px 5px 7px #E5E5E5;
	margin-bottom: 40px;

	.product-name {
		grid-column: 1/3;
		padding-left: 10px;
		height: 30px;	
		padding-top: 8px;
	}

	button {
		border: 2px solid #FF0400;
		background-color: #FF8280;
		color: white;
		height: 30px;
		padding-top: 5px;
	}

	button:hover {
		background-color: white;
		color: #FF0400
	}

	a {
		background-color: #22CCF2;
		color: white;
		text-decoration: none;
		text-align: center;
		height: 30px;		
		padding-top: 8px;
	}

	a:hover {
		color: #22CCF2;
		background-color: white;
		border: 2px solid #22CCF2;
	}

	.header {
		color: #22CCF2
		text-decoration: underline;
		margin-right: 20px; 
	}
`



export default ManageProducts;