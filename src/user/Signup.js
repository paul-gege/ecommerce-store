import React, {useState} from "react";
import cube from "./rubiks-cube.png";
import {Link} from "react-router-dom";
import {signup} from "../auth/index.js"
import {AuthForm, AuthDiv, AuthMessageDiv, AuthSuccessDiv, AuthErrorDiv} from "../styled-components/AuthStyles.js"
import {FormButton} from "../styled-components/Buttons.js"
import {FormInputs, FormBody, FormHeading} from "../styled-components/Forms.js"
// import styled from "styled-components";


const Signup = () => {

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false
	});


	const {name, email, password, error, success} = values;

	const handleChange = (name) => {
		return (event) => {
			setValues({...values, error: "", [name]: event.target.value});
		}
	} 

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({...values, error: ""});
		signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        });
	};

	const signUpForm = () => (
	    <AuthForm>
	    	<AuthErrorDiv displayMe={error}><p>{error}</p></AuthErrorDiv>
	    	<AuthSuccessDiv displayMe={success}>
	    		<p>
	    			Your account has now been created please <Link to="/signin">log in</Link>	    				
	    		</p>
	    	</AuthSuccessDiv>
	    	<FormHeading>
		    	<h2>Sign Up</h2>
		    	<p>Or <Link className="link" to="/signin">log in</Link></p>
		    </FormHeading>
			<FormBody>
				<FormInputs>
					<div>
		                <input
		                    onChange={handleChange("name")}
		                    type="text"
		                    className="form-control"
		                    value={name}
		                    placeholder="Full Name"
		                />
		            </div>

		            <div>
		                <input
		                    onChange={handleChange("email")}
		                    type="email"
		                    className="form-control"
		                    value={email}
		                    placeholder="Email"
		                />
		            </div>

		            <div>
		                <input
		                    onChange={handleChange("password")}
		                    type="password"
		                    className="form-control"
		                    value={password}
		                    placeholder="Password"
		                />
		            </div>
		        </FormInputs>
		        <FormButton onClick={clickSubmit}>
		            Sign up
		        </FormButton>
			</FormBody>	
	    </AuthForm>
	);

	return (
		<AuthDiv>
			<AuthMessageDiv>
				<h1>Welcome to ShopRite</h1>
				<p>Sign up to shop for some of our finest quality products</p>
				<img className="logo-img" src={cube} alt="company-logo"/>
			</AuthMessageDiv>
			{signUpForm()}
		</AuthDiv>
	)
}


export default Signup;