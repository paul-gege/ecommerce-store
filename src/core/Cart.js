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
				<CartItemsContainer>
					<h2>Your cart has {`${items.length}`} item(s)</h2>
					{items.map((product, i) => {
						return (
							<CartItem key={i} item={product} run={run} setRun={setRun} />
						)
					})}
				</CartItemsContainer>
				<CheckoutContainer>
					<Checkout products={items} />
				</CheckoutContainer>
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
	width: 90%;
	display: flex;
	justify-content: space-between;
	margin: 70px auto;

	@media (max-width: 768px) {
		flex-direction: column-reverse;
	}

`

const CartItemsContainer = styled.div`

	width: 60%;
	
	@media (max-width: 768px) {
		width: 100%;
	}
`

const CheckoutContainer = styled.div`
	width: 30%;
	
	@media (max-width: 768px) {
		width: 100%;
	}
`

export default Cart;

