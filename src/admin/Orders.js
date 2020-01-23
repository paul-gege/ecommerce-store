import React, {Fragment, useState, useEffect} from "react";
import {isAuthenticated} from "../auth/index.js";
import {Link} from "react-router-dom";
import {listOrders, getStatusValues, updateOrderStatus} from "./apiAdmin.js";
import styled from "styled-components";
import moment from "moment";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [statusValues, setStatusValues] = useState([]);
	const {user, token} = isAuthenticated();

	const loadOrders = () => {
		listOrders(user._id, token).then(data => {
			if(data.error){
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});
	};

	const loadStatusValues = () => {
		getStatusValues(user._id, token).then(data => {
			if(data.error){
				console.log(data.error);
			} else {
				setStatusValues(data);
			}
		})
	}

	useEffect(() => {
		loadOrders();
		loadStatusValues();
	}, []);

	const noOrders = orders => {
		return orders.length < 1 ? <h4>No orders</h4> : null;
	};

	const handleStatusChange = (e, orderId) => {
		updateOrderStatus(user._id, token, orderId, e.target.value)
		.then(data => {
			if(data.error){
				console.log("Status update failed");
			} else {
				loadOrders();
			}
		})
	}

	const showStatus = (order) => {
		return (
		<Fragment>
			<div className="status-header"><span className="header">Current Status:</span> {order.status}</div>
			<select onChange={e => handleStatusChange(e, order._id)}>
				<option>Update Status</option>
				{statusValues.map((status, index) => {
					return (<option key={index} value={status}>
						{status}
					</option>)
				})}
			</select>
		</Fragment>)
	}


	return (
		<OrdersDiv>
			{
				orders.map((order, orderIndex) => {
					return (
						<OrderItem key={orderIndex}>
							<div className="order-info order-index"><span className="header">Order Index: </span> {orderIndex}</div>
							<div className="order-info order-date"><span className="header">Created: </span> {moment(order.createdAt).fromNow()}</div>
							<div className="order-info order-id"><span className="header">Order Id: </span> {order._id}</div>
							<div className="order-info order-transaction"><span className="header">Transaction Id: </span> {order.transaction_id}</div>
							<div className="order-info order-amount"><span className="header">Amount: </span> ${order.amount}</div>
							<div className="order-info order-status">{showStatus(order)}</div>
							<div className="order-info order-buyer"><span className="header">Buyer Name: </span> {order.user.name}</div>
							<div className="order-info order-address"><span className="header">Delivery Address: </span> {order.address ? order.address : "Email Buyer"}</div>
							{order.products.map((product, productIndex) => {
								return (<div className="order-products">
									<div className="product-name"><span className="header">Product Name:</span> {product.name}</div>
									<div className="product-id"><span className="header">Product Id:</span> {product._id}</div>
									<div className="product-price"><span className="header">Product Price:</span> ${product.price}</div>
									<div className="product-count"><span className="header">Amount Ordered:</span> {product.count}</div>
								</div>)
							})}
						</OrderItem>
					)
				})
			}
		</OrdersDiv>
	)

}

const OrdersDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 80%;
	min-width: 850px;
	margin: 100px auto;
`

const OrderItem = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 10px;
	margin-bottom: 50px;

	.order-info {
		display: flex;
		align-items: center;
		padding-left: 10px;
		box-shadow: 0px 5px 7px #E5E5E5;
		font-size: 17px;
	}

	.order-index {
		grid-column: 1/3;
		font-size: 20px;
	}

	.order-status {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-left: 0;
	}

	.order-products {
		grid-column: 1/4;
		box-shadow: 0px 5px 7px #E5E5E5;
		padding-left: 10px;
		display: flex;
		flex-direction: column;	
	}

	.status-header {
		padding-left: 10px;
	}

	.header {
		color: #22CCF2
		font-weight: bold;
		text-decoration: underline;
		margin-right: 10px;
	}

	select {
		width: 100%;
		border: none;
		background-color: #22CCF2;
		height: 25px;
		color: black;
		-webkit-appearance: none;
  		-webkit-border-radius: 0px;
  		padding: 5px;
  		padding-left: 10px;
	}
`


export default Orders;