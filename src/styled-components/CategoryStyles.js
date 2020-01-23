import styled from "styled-components";

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
export const CategoryFormDiv = styled.div`

	margin: 25px auto;
	width: 30%;
	height: 250px; 
	min-width: 500px;
	box-shadow: 0px 5px 7px #E5E5E5;
	display: flex;
	justify-content: center;
	align-items: center;

	form {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 80%;
		height: 60%;
	}

	input {
		width: 70%;
		height: 40px;
		border: 0;
		border-bottom: 2px solid black;
		color: black;
	}	

	input::placeholder {
		color: black;
	}
	
	button {
		width: 40%;
		height: 45px;
		border-radius: 10px;
		background-color: #22CCF2;
		border: 0;
		color: white;
		margin-top: 10px;
	}

`

