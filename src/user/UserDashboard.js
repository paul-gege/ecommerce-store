import React, {useState, useEffect, Fragment} from "react";
import {isAuthenticated} from "../auth/index.js";
import {Link} from "react-router-dom";
import userIcon from "./usericon.png";
import userLogo from "./userlogo.png";
import mailLogo from "./maillogo.png";
import {ProfileContent, 
	ProfileMenu, 
	ProfileDataDiv, 
	ProfileInfoDiv, 
	HistoryDiv
} from "../styled-components/ProfileStyles.js";
import {getPurchaseHistory} from "./apiUser.js";
import styled from "styled-components"
import moment from "moment";

const Dashboard = () => {
	const [history, setHistory] = useState([]);


	const {_id, name, email, role} = isAuthenticated().user;
	const token = isAuthenticated().token;	

	const init = (userId, token) => {
		getPurchaseHistory(userId, token).then(data => {
			if(data.error){
				console.log(data.error);
			} else {
				setHistory(data);
			}
		})
	}

	useEffect(() => {
		init(_id, token);
	}, [])

	const purchaseHistory = (history) => {
		return (
			<Fragment>
				{history.map((purchase, index) => {
					return (
						<OrderList className="orders">
							<div className="order-number"><span className="header">Order Number:</span> {index}</div>
							{purchase.products.map((product, index) => {
								return (
									<Fragment>
										<div className="product-name"><span className="header">Product Name:</span> {product.name}</div>
										<div className="product-price"><span className="header">Product Price:</span> ${product.price}</div>
										<div className="product-quantity"><span className="header">Quantity:</span> {product.count}</div>
										<div className="product-time"><span className="header">Purchased:</span> {moment(product.createdAt).fromNow()}</div>
									</Fragment>
								)
							})}
						</OrderList>
					)
				})}
			</Fragment>
		)
	}

	return (
		<Fragment>
			<ProfileInfoDiv>
				<h1>Profile</h1>
				<Link to="/user/dashboard"><img className="profilePic" src={userIcon} alt="User Icon" /></Link>
				<ProfileDataDiv className="topInfo">
					<img src={userLogo} alt="User Icon" />
					<h3>{name}</h3>
				</ProfileDataDiv>
				<ProfileDataDiv>
					<img src={mailLogo} alt="User Icon" />
					<h3>{email}</h3>
				</ProfileDataDiv>
				<ProfileDataDiv>
					<h3>{role === 1 ? "Admin" : "Regular User"}</h3>
				</ProfileDataDiv>
			</ProfileInfoDiv>
			<ProfileContent>
				<ProfileMenu>
					<Link to="/cart">My Cart</Link>
					<Link to={`/profile/${_id}`}>Update Profile</Link>
				</ProfileMenu>				
			</ProfileContent>
			<ProfileContent>
				<HistoryDiv>
					{purchaseHistory(history)}
				</HistoryDiv>
			</ProfileContent>
		</Fragment>
	)
}

const OrderList = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 10px;

	.order-number {
		grid-column: 1/5;
		font-size: 17px;
		background-color: #22CCF2
		height: 30px;
		padding-top: 8px;
	}

	.product-name {
		background-color: black;
		color: white;
		display: flex;
		flex-direction: column;
	}

	.header {
		text-decoration: underline;
	}

	div {
		padding: 10px;
	}
`

export default Dashboard;