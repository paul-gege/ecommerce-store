import styled from 'styled-components';

export const CarousellDiv = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	overflow-x: scroll;
	scroll-behaviour: smooth;
	border: 1px solid black;

	/* width */
	::-webkit-scrollbar {
	  height: 4px;
	}

	/* Track */
	::-webkit-scrollbar-track {
	  background: white; 
	}
	 
	/* Handle */
	::-webkit-scrollbar-thumb {
	  background: black; 
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
	  background: #555; 
	}

`