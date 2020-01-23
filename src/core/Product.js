import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {read, listRelated} from './apiCore.js';
import styled from 'styled-components';
import person from "../user/usericon.png";
import CarousellCardImage from "./CarousellCardImage.js";
import {CarousellDiv} from "../styled-components/Carousell.js";
import CarousellCard from "./CarousellCard.js"
import {addItem} from "./cartHelpers.js";

const Product = (props) => {
	
	const [redirect, setRedirect] = useState(false);
	const [product, setProduct] = useState({});
	const [error, setError] = useState(false);
	const [index, setIndex] = useState([]);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [categoryName, setCategoryName] = useState("");

	useEffect(() => {
		const productId = props.match.params.productId;
		loadSingleProduct(productId);
	}, [props]);

	const loadSingleProduct = (productId) => {
		read(productId).then(data => {
			if(data.error){
				setError(data.error);
			} else {
				setCategoryName(data.category.name);
				setProduct(data);
				listRelated(data._id).then(data => {
					if(data.error){
						setError(data.error);
					} else {
						setRelatedProducts(data);
					}
				});
			}
		});
	}

	const addToCart = () => {
		addItem(product, () => {
			setRedirect(true);
		})
	}

	const loadImages = () => {
		let images = []
		for(var i = 0; i < product.imagecount; i++){
			images.push(
			<div key={i} className="scroll-image">
				<CarousellCardImage item={product} index={i} />
			</div>
			)
		}
		return images;
	}

	const shouldRedirect = (redirect) => {
		if(redirect){
			return <Redirect to="/cart" />;
		}
	}

	return (
	<ProductPage>
		{shouldRedirect(redirect)}
		<ProductDetails>
			<ProductImageDiv>
				{loadImages()}
			</ProductImageDiv>
			<ProductInfoDiv className="product-details">
				<ProductText className="product-text">
					<h3>{product.name}</h3>
					<p>{product.description}</p>
					<p>{categoryName}</p>
				</ProductText>	
				<button onClick={addToCart}>{`Add to cart - $${product.price}`}</button>		
			</ProductInfoDiv>
		</ProductDetails>
		<h2>Related Products</h2>
		<CarousellDiv className="carousell-div">
			{relatedProducts.map((product, i) => {
				return <CarousellCard key={i} product={product} />
			})}
		</CarousellDiv>
	</ProductPage>
	)
}

const ProductDetails = styled.div`
	display: flex;
	width: 80%;
	height: 450px;
	margin: 90px auto;
	margin-bottom: 100px;
	border: 1px solid black;

	@media (max-width: 768px) {
		flex-direction: column;
		height: 800px;
	}
`

const ProductText = styled.div`
	width: 100%;
	height: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid black;

	& p, & h3 {
		margin: 0;
		margin-bottom: 5px;
	} 

	@media (max-width: 768px) {
		flex-direction: column;
	}
`

const ProductInfoDiv = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;

	& button{
		background: none;
		height: 10%;
		width: 100%;
		border: 0;
		letter-spacing: 2px;
	}

	@media (max-width: 768px) {
		width: 100%;
		height: 50%;
	}
	
`

const ProductImageDiv = styled.div`

	border-right: 1px solid black;
	overflow-y: scroll;
	width: 50%;

	/* width */
	&::-webkit-scrollbar {
	  width: 2px;
	}

	/* Track */
	&::-webkit-scrollbar-track {
	  background: rgba(0,0,0,0.0); 
	}
	 
	/* Handle */
	&::-webkit-scrollbar-thumb {
	  background: black; 
	}

	.scroll-image {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.scroll-image img {
		width: 70%
	}

	@media (max-width: 768px) {
		width: 100%
		height: 50%;
		border-bottom: 1px solid black;
		border-right: none;
	}
`

const ProductPage = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 100px;

	.carousell-div {
		width: 90%;
	}
`

export default Product;
