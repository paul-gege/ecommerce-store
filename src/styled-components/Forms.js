import styled from "styled-components";

/*
	Follow AuthForm - (/styled-components/AuthStyles.js) 
	for wrapping your form and making sure that the form follows standards
*/

export const FormInputs = styled.div`
	input {
		width: 100%;
		height: 50px;
		color: #E5E5E5;
		padding: 0px;
		background-color: #171F26;
		border: 0;
		border-bottom: 2px solid #E5E5E5; 
		outline: none;
	}

	input::placeholder {
		color: #E5E5E5;
	}
`

export const FormBody = styled.div`
	height: 60%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`

export const FormHeading = styled.div`
	display: flex;
	flex-direction: column;
	height: 20%; 
	justify-content: space-around;
`