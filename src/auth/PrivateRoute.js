import React from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./index.js";

const PrivateRoute = ({component: Component, ...rest}) => (
	//rest is props for our Route component
	<Route {...rest}
		//render allows us to pass props to our component from here while component just lets us render our component
		render = {
			//props are props we're getting from Route
			(props) => {
				return isAuthenticated() ? ( <Component {...props}/> ) : (
					<Redirect 
						to={{
							pathname: "/signin",
							state: {from: props.location}
						}}
					/>

				)
			}		
		}
	/>
);

export default PrivateRoute;