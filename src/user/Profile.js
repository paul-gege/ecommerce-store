import React, {useState, useEffect} from "react";
import {isAuthenticated} from "../auth/index.js";
import {read, update, updateUser} from "./apiUser.js";
import {Redirect} from "react-router-dom";
import styled from "styled-components";
import {ProfileFormButton} from "../styled-components/Buttons.js"

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
			<FormDiv>
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
					<ProfileFormButton onClick={clickSubmit}>
						Submit
					</ProfileFormButton>
				</form>
			</FormDiv>
		</div>

	)
}

const FormDiv = styled.div`
	width: 60%;
	max-width: 600px;
	height: 320px;
	margin: 80px auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0px 5px 7px #E5E5E5;

	form {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction : column;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 25px;
	}

	input {
		width: 70%;
		height: 30px;
		border: 0px;
		border-bottom: 2px solid black;
	}

	input::placeholder {
		color: black;
	}

	button 

	
`

export default Profile;