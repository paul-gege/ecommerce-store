import React, {useState, useEffect} from "react";
import styled from "styled-components";
const Checkbox = ({categories, handleFilters}) => {
	const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        // return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state > push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

	return (
		<CheckboxDiv>
			{categories.map((c,i) => {
				return <li key={i} className="category-option">
					<label className="container">
						{c.name}
						<input type="checkbox" 
							onChange={handleToggle(c._id)}
							value={!(checked.indexOf(c._id) === -1)}
						/>
						<span className="checkmark"></span>
					</label>
				</li>
			})}
		</CheckboxDiv>
	)

}

const CheckboxDiv = styled.div`
	box-shadow: -5px 5px 7px #E5E5E5;
	width: 100%;
	padding: 25px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	/* The container */
	.container {
		display: block;
		position: relative;
		padding-left: 35px;
		cursor: pointer;
		font-size: 22px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	/* Hide the browser's default checkbox */
	.container input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	/* Create a custom checkbox */
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: #eee;
	}

	/* On mouse-over, add a grey background color */
	.container:hover input ~ .checkmark {
		background-color: #ccc;
	}

	/* When the checkbox is checked, add a blue background */
	.container input:checked ~ .checkmark {
		background-color: #2196F3;
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	/* Show the checkmark when checked */
	.container input:checked ~ .checkmark:after {
		display: block;
	}

	/* Style the checkmark/indicator */
	.container .checkmark:after {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
	li {
		list-style: none;
	}
	

`

export default Checkbox;