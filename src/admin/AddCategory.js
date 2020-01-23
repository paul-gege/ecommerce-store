import React, {useState, Fragment} from "react";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {createCategory} from "./apiAdmin.js";
import {AuthSuccessDiv, AuthErrorDiv} from "../styled-components/AuthStyles.js";
import {CategoryFormDiv} from "../styled-components/CategoryStyles.js";
import HeaderContainer from "../styled-components/HeaderDiv.js"

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false)
	const [visibility, setVisibility] = useState(true);

	const {user, token} = isAuthenticated();

	const handleChange = (e) => {
		setSuccess(false)
		setError("");
		setName(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		createCategory(user._id, token, {name})
		.then(data => {
			if(data.error){
				setError(data.error);
			} else {
				setError("");
				setSuccess(true);
			}
		})
	}

	const newCategoryForm = () => {
		return (
		<form onSubmit={clickSubmit}>
			<AuthErrorDiv displayMe={error}><p>Error creating category</p></AuthErrorDiv>
			<AuthSuccessDiv displayMe={success}><p>{name} is created</p></AuthSuccessDiv>
			<input type="text" 
				onChange={handleChange}
				value={name}
				autoFocus
				placeholder="Category Name"
			/>
			<button>Create Category</button>
		</form>
		)
	}

	const showSuccess = () => {
		console.log(success);
		console.log(error);
		if(success){
			return <p>{name} is created</p>
		}
	}

	const showError = () => {
		if(error){
			return <p>{error}d</p>
		}
	}

	return (
		<div>
			<HeaderContainer><h1>Create Category</h1></HeaderContainer>
				<CategoryFormDiv>
					{newCategoryForm()}
				</CategoryFormDiv>
		</div>
	)
}

export default AddCategory;