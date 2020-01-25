import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getBraintreeClientToken, processPayment, createOrder} from "./apiCore.js";
import {getCart, emptyCart} from "./cartHelpers.js";
import styled from "styled-components";
import {isAuthenticated} from "../auth/index.js";
import DropIn from "braintree-web-drop-in-react";


const Checkout = ({products}) => {
	const [data, setData] = useState({
		success: false,
		clientToken: null,
		error: "",
		instance: {},
		address: ""
	})

	const userId = isAuthenticated() && isAuthenticated().user._id
	const token = isAuthenticated() && isAuthenticated().token;

	const getToken = (userId, token) => {
		getBraintreeClientToken(userId, token).then(data => {
			if(data.error){
				setData({...data, error: data.error});
			} else {
				setData({...data, clientToken: data.clientToken});
			}
		});
	};

	const handleAddress = event => {
		setData({...data, address: event.target.value});
	}

	const deliveryAddressFilled = () => {
		if(data.address){
			return true;
		} else {
			return false
		}
	}

	useEffect(() => {
		getToken(userId, token);
	}, []);

	const getTotal = () => {
		return products.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0);
	};

	const showCheckout = () => {
		return isAuthenticated() ? (
			<div>{showDropIn()}</div>
		): (
			<Link to="/signin">
				Sign in to checkout
			</Link>
		);
	};
	let deliveryAddress = data.address;
	const buy = () => {
		let nonce;
		let getNonce = data.instance.requestPaymentMethod()
							.then(data => {
								nonce = data.nonce
								const paymentData = {
									paymentMethodNonce: nonce,
									amount: getTotal(products)
								}

								processPayment(userId, token, paymentData)
									.then(response => {
										const createOrderData = {
											products: products,
											transaction_id: response.transaction.id,
											amount: response.transaction.amount,
											address: deliveryAddress
										};

										createOrder(userId, token, createOrderData)
											.then((response) => {
												emptyCart(() => {
													setData({...data, success: true});
												});
												window.location.reload();
											})
											.catch(error => {
												console.log(error)
											})
									})
									.catch(error => console.log(error));
							})
							.catch(error => {
								setData({...data, error: error.message});
							});
	}
	
	const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            {data.clientToken !== null && products.length > 0 ? (
                <Fragment>
                	<AddressDiv>
                		{(!deliveryAddressFilled()) ? <span> Please enter a Delivery Address </span> : ""}
                		<textarea
							onChange={handleAddress}
							value={data.address}
							placeholder="Type your delivery address here please"
                		/>
                	</AddressDiv>
                    <DropIn
                        options={{
                            authorization: data.clientToken
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <PayButton>
                    	<button disabled={!deliveryAddressFilled()} onClick={buy}>
                       		Pay
                    	</button>
                    </PayButton>
                </Fragment>
            ) : null}
        </div>
    );

	return (
		<div>
			<h2>Total: ${getTotal()}</h2>
			{showCheckout()}
		</div>		
	)

}

const AddressDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0;
	span {
		color: #FF6966;
		margin-bottom: 10px;
	}

	textarea {
		width: 100%;
		border: 1px solid black;
		border-radius: 5px;
	}

	textarea::placeholder {
		color: black;
	}
`

const PayButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	
	button {
		width: 80%;
		border: 0;
		height: 100%;
		background-color: #14D9B5;
	}

	button:disabled {
		background-color: grey;
		color: black;
	}
`

export default Checkout;