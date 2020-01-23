import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getCart} from "./cartHelpers.js";
import styled from "styled-components";
import CartItem from "./CartItem.js";
import Checkout from "./Checkout.js"
// import CarousellCardImage from "./CarousellCardImage.js";

const Cart = () => {
	const [items, setItems] = useState([]);
	const [run, setRun] = useState(false);
	

	useEffect(() => {
		setItems(getCart());
	}, [run]);

	const showItems = (items) => {
		return (
			<ShowCartItems>
				<div className="items">
					<h2>Your cart has {`${items.length}`} items</h2>
					{items.map((product, i) => {
						return (
							<CartItem key={i} item={product} run={run} setRun={setRun} />
						)
					})}
				</div>
				<div className="checkout">
					<Checkout products={items} />
				</div>
			</ShowCartItems>
		)
	}

	return (
		<div>
			{showItems(items)}
		</div>
	)
}

const ShowCartItems = styled.div`
	width: 80%;
	display: flex;
	justify-content: space-between;
	margin: 50px auto;

	.items {
		width: 70%;
	}

	.items .cart-item{
		width: 100%;
		height: 150px;
		box-shadow: -5px 5px 7px #E5E5E5;
		padding: 1px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.items .cart-item .static {
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.items .cart-item .static img{
		width: 50%;
		height: 100%;
		border-right: 2px solid black;
	}

	.items .cart-item .static .details{
		width: 50%;
		margin-left: 20px;
	}

	.items .cart-item .cart-update{
		width: 20%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	p {
		margin: 0;
		letter-spacing: 2px;
	}

	input {
		width: 40%;
		border: 0;
		border-bottom: 2px solid black;
		padding-bottom: 0px;
		margin-top: 2px;
	}

	button {
		margin-top: 10px;
		border: 2px solid black;
		border-radius: 4px;
		padding-top: 2px;
	}

	button:hover {
		color: white;
		background-color: black;
	}

	.quantity {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}

	.checkout {
		width: 25%;
	}
`


export default Cart;

