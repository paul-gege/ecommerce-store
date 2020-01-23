import React, {useState, useEffect} from "react";
import {isAuthenticated} from "../auth/index.js";
import {read, update, updateUser} from "./apiUser.js";
import {Redirect} from "react-router-dom";


const Profile = ({match}) => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: false,
		success: false
	});

	const {token} = isAuthenticated();
	const {name, email, password, error, success} = values;

	const init = (userId) => {
		read(userId, token).then(data => {
			if(data.error){
				setValues({...values, error: true});
			} else {
				setValues({...values, name: data.name, email: data.email});
			}
		});
	};

	const handleChange = (name) => (event) => {
		setValues({...values, error: false, [name]:event.target.value});
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		update(match.params.userId, token, {name, email, password})
		.then(data => {
			if(data.error){
				console.log(data.error);
			} else {
				updateUser(data, () => {
					setValues({
						...values,
						name: data.name,
						email: data.email,
						success: true
					});
				});
			}
		})
	}

	const redirectUser = (success) => {
		if(success){
			return <Redirect to="/user/dashboard" />
		}
	}

	useEffect(() => {
		init(match.params.userId);
	}, []);

	return (
		<div>
			{redirectUser(success)}
			<h2>User Profile</h2>
			<form>
				<input 
					type="text"
					onChange={handleChange("name")}
					value={name} 
					placeholder="Full Name"/>
				<input 
					type="email"
					onChange={handleChange("email")}
					value={email} 
					placeholder="Email"/>
				<input 
					type="password"
					onChange={handleChange("password")}
					value={password} 
					placeholder="Password"/>
				<button onClick={clickSubmit}>
					Submit
				</button>
			</form>
		</div>

	)
}

export default Profile;