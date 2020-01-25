import styled from "styled-components";

export const AuthErrorDiv = styled.div`
	background-color: #FF9B99;
	width: 100%;
	height: 40px;
	display: ${props => props.displayMe ? "flex" : "none"};
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	margin-bottom: 10px;
	p {
		color: black;
	}
`
export const AuthSuccessDiv = styled.div`
	background-color: #96E6A1;
	width: 100%;
	height: 40px;
	display: ${props => props.displayMe ? "flex" : "none"};
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	margin-bottom: 10px;
	p {
		color: white;
	}
`

export const AuthMessageDiv = styled.div`
	height: 100%;
	width: 40%;
	padding: 20px;
	text-align: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
  	align-items: center;
  	h1 {
  		margin: 0;
  	}
	img {
		margin-top: 40px;
		width: 30%;
	}
`

export const AuthForm = styled.form`
	width: 60%;
	background-color: #171F26; 
	height: 110%;
	box-shadow: 5px 5px 7px grey;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px 80px;
	color: #E5E5E5;

	.link {
		color: #22CCF2
	}

	.link:hover {
		color: #14D9B5
	}

	h2 {
		margin: 0;
	}

	p {
		margin: 0; 
	}

	@media (max-width: 768px) {
    	width: 100%;
    	height: 550px;
    	margin-top: 20px;
  	}

`

export const AuthDiv = styled.div`
	width: 60%;
	min-width: 900px;
	max-width: 960px;
	height: 450px;
	margin: 120px auto;
	background-color: white;
  	box-shadow: -5px 5px 7px #E5E5E5;
  	display: flex;
  	align-items: center;

	@media (max-width: 768px) {
    	flex-direction: column;
    	width: 100%;
    	min-width: 0;
    	margin-top: 100px;
  	}

`