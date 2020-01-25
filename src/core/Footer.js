import React from "react";
import styled from "styled-components";
import instagram from "./instagramLogo.png";
import linkedin from "./linkedInlogo.png";
import email from "./gmail.png"

const Footer = () => {

	return (
		<FooterDiv>
			<h2>Contact Developer</h2>
			<div className="contact">
				<a href="https://www.linkedin.com/in/paul-femi-gege-772885120">
					<div className="contact-link">
						<img src={linkedin} alt="linkedin"/>
						<span>Paul Femi-Gege</span>
					</div>
				</a>
				<a href="https://www.instagram.com/paulfantasy/">					
					<div className="contact-link">
						<img src={instagram} alt="Instagram"/>
						<span>@paulfantasy</span>
					</div>
				</a>
				<a href="mailto:gege.temi@gmail.com">
					<div className="contact-link">
						<img src={email} alt="email"/>
						<span>gege.temi@gmail.com</span>
					</div>
				</a>
			</div>
		</FooterDiv>
	)
}

const FooterDiv = styled.div`
	width: 100%;
	background-color: black;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		width: 3.5vw;
		margin-bottom: 5px;
	}

	a {
		text-decoration: none;
		color: white;
		font-size: 20px;
	}

	.contact {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-bottom: 30px;
	}

	.contact-link {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media (max-width: 500px) {
		.contact {
			flex-direction: column;
		}
		img {
			width: 4.5vw;
		}
	}
`

export default Footer;