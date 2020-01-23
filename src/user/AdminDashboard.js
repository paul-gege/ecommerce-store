import React, {Fragment} from "react";
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
import Order from "../admin/Orders.js"

const AdminDashboard = () => {

	const {_id, name, email, role} = isAuthenticated().user;

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
					<Link to="/create/category">Create Category</Link>
					<Link to="/create/product">Create Product</Link>
					<Link to="/admin/orders">View Orders</Link>
					<Link to="/admin/products">Manage Products</Link>
				</ProfileMenu>
			</ProfileContent>
		</Fragment>
	)
}

export default AdminDashboard;