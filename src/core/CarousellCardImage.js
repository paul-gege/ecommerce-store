import React from "react";
import {API} from "../config.js";
import blank from "./blank.png";


const CarousellCardImage = ({item, index}) => {

	if(item.imagecount > index){
		return (
			<img src={`${API}/products/photo/${item._id}/${index}`}
				alt={`${item.name} image`}
			/>
		)
	} else {
		return (
			<img src={blank}
			alt={`${item.name} image`} />
		)
	}
}

export default CarousellCardImage;

