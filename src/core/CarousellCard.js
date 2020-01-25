import React from "react";
import {Link} from "react-router-dom";
import person from "../user/usericon.png"
import styled from "styled-components";
import CarousellCardImage from "./CarousellCardImage.js"

const CarousellCard = ({product}) => {
	return (
		<AspectRatioDiv>
			<StyledLink to={`/product/${product._id}`}>
				<CarousellCardImage item={product} index={0} />
				<span>{product.name.substring(0, 20)}{(product.name.length < 20) ? "" : "..."}</span>
			</StyledLink>
		</AspectRatioDiv>
	)
}

const StyledLink = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding-top: 100%;
	text-decoration: none;
	color: black;
	position: relative;
	text-align: center;

	img {
		width: 60%;
		position: absolute;
		bottom: 25%;		
	}

	span {
		display: block;
		position: absolute;
		top: 80%;
		left: 0px;
		right: 0px;
	}
`

const AspectRatioDiv = styled.div`
	min-width: calc(100% / 4);
	min-height: 125px;
	@media (max-width: 768px) {
   		min-width: calc(100% / 3);
    }
`

export default CarousellCard;

