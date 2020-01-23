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
		<div className="cart-item">
			<div className="static">						
				<CarousellCardImage item={item} index={0} />
				<div className="details">
					<p>{item.name}</p>
					<p>${item.price} x {item.count}pcs = ${item.count * item.price}</p>
					<p>Stock: {stock(item)}</p> 
				</div>
			</div>
			<div className="cart-update">
				<div className="quantity">
					<p>Quantity</p>
					<input type="number" value={count} onChange={handleChange(item._id)}/>
				</div>
				<button onClick={() => {
					removeItem(item._id);
					setRun(!run);
				}}>Remove</button>
			</div>
		</div>
	)
}

export default CartItem;