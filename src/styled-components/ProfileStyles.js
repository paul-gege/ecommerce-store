import styled from "styled-components";

export const ProfileInfoDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 40vh;
	min-height: 350px;
	background-color: black;
	color: white;
	margin-top: 50px;
	.profilePic {
		width: 80px;
	}

	.topInfo {
		margin-top: 20px;
	}
`

export const ProfileDataDiv = styled.div`
	margin-top: 10px;
	display: flex;
	width: 40%;
	justify-content: center;
	align-items: center;
	img {
		width: 20px;
		margin-right: 10px; 
	}
	h3 {
		margin: 0;
	}	
`

export const ProfileMenu = styled.div`
	width: 100%;
	display: flex;
	height: 30px;
	align-items: center;
	justify-content: space-around;
	box-shadow: 0px 5px 7px #E5E5E5;

	a {
		font-size: 17px;
		text-decoration: none;
		color: black;
	}

	@media (max-width: 768px) {
		align-self: center;
		width: 70%;
		flex-direction: column;
		height: 100px;
	}
`

export const HistoryDiv = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	a {
		margin-left: 40px;
		font-size: 20px;
		text-decoration: none;
		color: black;
	}
`

export const ProfileContent = styled.div`
	width: 80%;
	margin: 40px auto;
	display: flex;
	justify-content: center;
`
