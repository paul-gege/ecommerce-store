import React, {useState, useEffect} from "react";
import {getProducts} from "./apiCore.js";
import CarousellCard from "./CarousellCard.js"
import {CarousellDiv} from "../styled-components/Carousell.js";
import styled from "styled-components";

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
	margin: 100px auto;
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;

	.carousell-card {
		width: calc(100% / 2);
	}

	@media (max-width: 768px) {
   		width: 90%;
    }
`


export default Home;