import React, {Fragment, useState, useEffect} from "react";
import {getCategories, getFilteredProducts} from "./apiCore.js";
import Checkbox from "./Checkbox.js";
import styled from "styled-components";
import ShopCard from "./ShopCard.js"
import HeaderContainer from "../styled-components/HeaderDiv.js"


const Shop = () => {
	const[myFilters, setMyFilters] = useState({
		filters: {category: [], price: [], name: ""}
	})
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [limit, setLimit] = useState(6);
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(0);
	const [searchWord, setSearchWord] = useState("");
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);
	const [filteredResults, setFilteredResults] = useState([]);

	const init = () => {
		getCategories().then(data => {
			if(data.error){
				setError(data.error);
			} else {
				setCategories(data);
			}
		})
	}

	const handlePrices = (name) => {
		return (event) => {
			handleFilters([], "price");
			if(event.key === 'Enter'){
				let maxValue = parseInt(maxPrice)
				let minValue = parseInt(minPrice)
				
				if(maxValue >= minValue){
					handleFilters([minValue, maxValue], "price" );
					console.log(myFilters);
				}
			}
			if(name === "min") {
				setMinPrice(event.target.value);
			}
			if(name === "max"){
				setMaxPrice(event.target.value);
			}
		}
	}

	const handleKeyWord = (event) => {
		setSearchWord(event.target.value);
		handleFilters(event.target.value, "name");
	}

	const loadFilteredResults = (newFilters) => {
		getFilteredProducts(skip, limit, newFilters).then(data => {
			if(data.error) {
				setError(data.error);
			} else {
				setFilteredResults(data.data);
				setSize(data.size);
				setSkip(0);
			}
		})
	}

	const loadMore = () => {
		let toSkip = skip + limit;
		getFilteredProducts(toSkip, limit, myFilters.filters).then(data=>{
			if(data.error){
				setError(data.error);
			} else {
				setFilteredResults([...filteredResults, ...data.data]);
				setSize(data.size);
				setSkip(toSkip);				
			}
		})
	}

	const ProductNotFound = () => {
		return (
			size < 1 && (<h3>Products not found</h3>)
		)
	}

	const loadMoreButton = () => {
		return (
			size > 0 && size >=limit && (
				<button className="load-more" onClick={loadMore}> Load More </button>
			)
		)
	}

	const handleFilters = (filters, filterBy) => {
		const newFilters = {...myFilters};
		newFilters.filters[filterBy] = filters;
		setMyFilters(newFilters);
		loadFilteredResults(myFilters.filters);
	}

	useEffect(() => {
		init();
		loadFilteredResults(myFilters.filters);
	}, [])


	return (
		<Fragment>
			<HeaderContainer><h1>Shop</h1></HeaderContainer>
			<ShopDiv>
				<label className="filter-label" htmlFor="filter-toggle"><h3>Toggle Filters</h3></label>
				<input type="checkbox" id="filter-toggle" name="filter-toggle"/>
				<div className="sidebar">
					<SideBarInputDiv>
						<input type="text" value={searchWord}
							placeholder="Search" 
							className="search-bar"
							onChange={handleKeyWord}/>
					</SideBarInputDiv>
					<Checkbox categories={categories} handleFilters={filters => handleFilters(filters, "category")}/>
					<SideBarInputDiv>
						<input type="number" 
							placeholder="$ Min" 
							min="0" 
							onChange={handlePrices("min")} 
							onKeyDown={handlePrices("min")} 
							value={minPrice}
						/>
						<span> to </span>
						<input type="number" 
							placeholder="$ Max" 
							min="0" 
							onChange={handlePrices("max")} 
							onKeyDown={handlePrices("max")} 
							value={maxPrice}
						/>
					</SideBarInputDiv>
				</div>		
				<div className="product-view">
					{ProductNotFound()}
					{filteredResults.map((product, index) => {
						return <ShopCard key={index} product={product} />
					})}
				</div>
				<div className="load-more-div">
					{loadMoreButton()}
				</div>
			</ShopDiv>
		</Fragment>	
	)
}


const ShopDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	justify-content: space-between;
	width: 85%;
	margin: 0 auto;
	.sidebar {
		width: 100%;
	}

	.product-view {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.sidebar {
		display: none;
	}

	.filter-label {
		box-shadow: -5px 5px 7px #E5E5E5;
		width: 30%;
		text-align: center;
		cursor: pointer;
		margin: 20px;
	}

	.filter-label:hover {
		box-shadow: -5px 5px 7px #E5E5E5 inset;
	}

    #filter-toggle {
        display: none;  
    }

    #filter-toggle:checked + .sidebar {
        display: block;  
    }


	.load-more {
		width: 40%;
		height: 30px;
		background-color: #22CCF2
	}

	.load-more:hover {
		background-color: #14D9B5;
	}

	.load-more-div{
		margin-top: 10px;
		margin-bottom: 50px;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		grid-gap: 10px;
	}
`

const SideBarInputDiv = styled.div`
	width: 100%;
	box-shadow: -5px 5px 7px #E5E5E5;
	margin-top: 25px;
	padding: 25px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	input {
		width: 30%;
		border: 0;
		border-bottom: 2px solid black;
	}

	.search-bar {
		width: 100%
	}

	input::placeholder {
		color: black;
	}
`

export default Shop;