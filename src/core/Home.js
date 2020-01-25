import React, {useState, useEffect} from "react";
import {getProducts} from "./apiCore.js";
import CarousellCard from "./CarousellCard.js"
import {CarousellDiv} from "../styled-components/Carousell.js";
import styled from "styled-components";
import banner from "./banner.jpg";

const Home = () => {
	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setProductsByArrival] = useState([]);
	const [error, setError] = useState(false);

	const loadProductsBySell = () => {
		getProducts("sold").then(data => {
			if(data.error){
				setError(data.error);
			} else {
				setProductsBySell(data);
			}
		});
	};

	const loadProductsByArrival = () => {
		getProducts("_id").then(data => {
			if(data.error){
				setError(data.error);
			} else {
				setProductsByArrival(data);
			}
		});
	};

	useEffect(() => {
		loadProductsByArrival();
		loadProductsBySell();
	}, [])

	return (
		<FeaturedProducts>
			<div className="banner">
				<img src={banner} alt="Display Product"/>
				<div className="banner-caption">
					<h1>Simple E-commerce store</h1>
					<h2>Created By: Paul Gege </h2>
					<h3>Try out all features</h3>
					<div className="contact">
						<a href="linkedin.com/in/paul-femi-gege-772885120">Click Here for LinkedIn Profile</a>
					</div>
				</div>
			</div>
			<h2>Best Sellers</h2>
			<CarousellDiv>
				{productsBySell.map((product, i) => {
					return (
							<CarousellCard key={i} href={`#${i}`} product={product} />
					)
				})}
			</CarousellDiv>
			<h2>New Arrivals</h2>
			<CarousellDiv>
				{productsByArrival.map((product, i) => {
					return <CarousellCard key={i} product={product} />
				})}
			</CarousellDiv>
		</FeaturedProducts>
	)
}

const FeaturedProducts = styled.div`
	margin: 50px auto;
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid black;

	.banner {
		width: 100%;
		position: relative;
	}

	.banner img {
		width: 100%;
	}

	.banner-caption {
		width: 100%;
		position: absolute;
		bottom: 20%;
		left: 5%;
		color: white;
	}

	.banner-caption h1 {
		font-size: 2.5vw;
		margin: 0;
	}
	.banner-caption h2 {
		font-size: 1.5vw;
		margin: 0;
	}
	.banner-caption h3 {
		font-size: 1.5vw;
		color: white;
	}
	.banner-caption a {
		font-size: 1.5vw;
		color: white;
	}
	.carousell-card {
		width: calc(100% / 2);
	}

	@media (max-width: 768px) {
   		width: 90%;

   		.banner-caption h1 {
			font-size: 3.5vw;
			margin: 0;
		}
		.banner-caption h2 {
			font-size: 2.5vw;
			margin: 0;
		}
		.banner-caption h3 {
			font-size: 2.5vw;
			color: red
		}

    }
`


export default Home;