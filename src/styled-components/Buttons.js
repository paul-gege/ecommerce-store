import styled from "styled-components";

export const FormButton = styled.button`
	width: 40%;
	height: 45px;
	border-radius: 10px;
	align-self: flex-end;
	background-color: #22CCF2;
	border: 0;
	color: white;

	&:hover {
		background-color: #14D9B5;
	}
	@media (max-width: 768px) {
    	width: 60%;
  	}

`

export const ProfileFormButton = styled(FormButton)`
	align-self: center;
`