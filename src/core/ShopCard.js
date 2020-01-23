import React from "react";
import {Link} from "react-router-dom";
import person from "../user/usericon.png"
import styled from "styled-components";
import CarousellCardImage from "./CarousellCardImage.js"

const ShopCard = ({product}) => {
	return (
		<AspectRatioDiv>
			<StyledLink to={`/product/${product._id}`}>
				<span className="price" >${product.price}</span>
				<CarousellCardImage item={product} index={0} />
				<span>{product.name}</span>
			</StyledLink>
		</AspectRatioDiv>
	)
}
//box-shadow: -5px 5px 7px #E5E5E5;
const StyledLink = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	text-decoration: none;
	color: black;
	position: relative;
	text-align: center;
	box-shadow: -5px 5px 7px #E5E5E5;
	padding-top: 100%;
	
	&:hover {
		box-shadow: -5px 5px 7px #E5E5E5 inset;
	}

	img {
		width: 50%;
		position: absolute;
		bottom: 30%;		
	}

	span {
		display: block;
		position: absolute;
		top: 80%;
		left: 0px;
		right: 0px;
	}

	.price {
		display: block;
		position: absolute;
		top: 10%;
		right: 70%;
		z-index: 1;
	}

	@media (max-width: 768px) {

    }
`

const AspectRatioDiv = styled.div`
	width: calc(100% / 3);
	min-width: 200px;

`

export default ShopCard;

