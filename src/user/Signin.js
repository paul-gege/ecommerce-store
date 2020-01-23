import React, {useState} from "react";
// import styled from "styled-components";
import cube from "./rubiks-cube.png";
import {Link, Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticated} from "../auth/index.js"
import {FormButton} from "../styled-components/Buttons.js"
import {FormInputs, FormBody, FormHeading} from "../styled-components/Forms.js"
import {AuthForm, AuthDiv, AuthMessageDiv, AuthErrorDiv} from "../styled-components/AuthStyles.js"


const Signin = () => {

	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		redirectToReferrer: false
	});

	const {email, password, error, redirectToReferrer} = values;
	const user = isAuthenticated();

	const handleChange = (name) => {
		return (event) => {
			setValues({...values, error: false, [name]: event.target.value});
		}
	} 

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({...values, error: false});
		signin({email, password})
		.then((data) => {
			if(data.error){
				setValues({...values, error:data.error});
			} else {
				authenticate(data, () => {
					setValues({
						...values,
						redirectToReferrer: true
					});
				});
			}
		});
	}


	const signInForm = () => (
	    <AuthForm>
			<AuthErrorDiv displayMe={error}><p>{error}</p></AuthErrorDiv>
	    	<FormHeading className="form-heading">
		    	<h2>Log In</h2>
		    	<p>Or sign up and <Link className="link" to="/signup">create a new ShopRite account.</Link></p>
		    </FormHeading>
			<FormBody>
				<FormInputs>
			        <div className="form-group">
			            <input
			                onChange={handleChange("email")}
			                type="email"
			                className="form-control"
			                value={email}
			                placeholder= "Email"
			            />
			        </div>

			        <div className="form-group">
			            <input
			                onChange={handleChange("password")}
			                type="password"
			                className="form-control"
			                value={password}
			                placeholder= "Password"
			            />
			        </div>
			    </FormInputs>
		        <FormButton onClick={clickSubmit} className="btn btn-primary">
		            Log In
		        </FormButton>
			</FormBody>	
	    </AuthForm>
	);

	const redirectUser = () => {
		if(redirectToReferrer){
			return <Redirect to="/" />;
        } 
        if(isAuthenticated()){
        	return <Redirect to="/" />;
        }
	}

	return (
		<AuthDiv>
			<AuthMessageDiv>
				<h1>Welcome to ShopRite</h1>
				<p>Log in to shop for some of our finest quality products</p>
				<img className="logo-img" src={cube} alt="company-logo"/>
			</AuthMessageDiv>
			{signInForm()}
			{redirectUser()}
		</AuthDiv>
	)
}

export default Signin;