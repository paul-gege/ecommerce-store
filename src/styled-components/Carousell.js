import styled from 'styled-components';

export const CarousellDiv = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	overflow-x: scroll;
	overflow-y: hidden;
	scroll-behaviour: smooth;
	box-shadow: -5px 5px 7px #E5E5E5;

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