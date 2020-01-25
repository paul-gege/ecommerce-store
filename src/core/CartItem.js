import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import CarousellCardImage from "./CarousellCardImage.js";
import {updateItem, removeItem} from "./cartHelpers.js";


const CartItem = ({item, run, setRun}) => {
	const [count, setCount] = useState(item.count);

	const stock = (item) => {
		if(item.quantity < 1){
			return "Out of stock"
		} else {
			return `${item.quantity}`
		}
	}

	const handleChange = productId => event => {
	    setRun(!run); // run useEffect in parent Cart
	    setCount(event.target.value);
	    if (event.target.value >= 1) {
	    	updateItem(productId, event.target.value);
	    }
	};

	return (
		<CartItemDiv className="cart-item">		
			<div className="item-image">			
				<CarousellCardImage item={item} index={0} />
			</div>
			<div className="item-details item-name"><span className="header">Item Name:</span> {item.name}</div>
			<div className="item-details item-price"><span className="header">Item price:</span> ${item.price}</div> 
			<div className="item-details item-cost"><span className="header">Total Cost:</span> ${item.count * item.price}</div>
			<div className="item-details item-stock"><span className="header">Stock Left:</span> {stock(item)}</div> 
			<div className="item-details item-quantity">
				<span className="header">Quantity:</span> <input type="number" value={count} onChange={handleChange(item._id)}/>
			</div>
			<div className="remove-button">
				<button onClick={() => {
					removeItem(item._id);
					setRun(!run);
				}}>Remove</button>
			</div>
		</CartItemDiv>
	)
}

const CartItemDiv = styled.div`
	width: 100%;
	padding: 1px;
	display: grid;
	grid-template-columns: 1fr 3fr;
	margin-bottom: 40px;
	grid-gap: 10px;

	.item-details {
		grid-column: 2 / 3;
		box-shadow: -5px 5px 7px #E5E5E5;
		height: 30px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 20px;
	}

	.item-image {
		grid-column: 1 / 2;
		grid-row: 1 / 5;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	img {
		width: 70%;
	}

	.remove-button {
		grid-column: 1/2;
		grid-row: 5/6;
	}

	button {
		width: 100%;
		border: 2px solid #FF0400;
		background-color: #FF8280;
		color: white;
		height: 30px;
		padding-top: 5px;
	}

	input {
		width: 30%;
		border: 0;
		border-bottom: 2px solid black;
		margin-bottom: 4px;
	}

	.header {
		color: #22CCF2
		text-decoration: underline;
		margin-right: 20px; 
	}
`

export default CartItem;