import React, {useState, useEffect} from 'react';
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
				<button>Sign in to checkout</button>
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
                <div>
                	<div>
                		<textarea
							onChange={handleAddress}
							value={data.address}
							placeholder="Type your delivery address here please"
                		/>
                	</div>
                    <DropIn
                        options={{
                            authorization: data.clientToken
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy}>
                        Pay
                    </button>
                </div>
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

export default Checkout;