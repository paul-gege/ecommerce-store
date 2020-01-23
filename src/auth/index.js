import {API} from "../config.js";
import Cookies from 'js-cookie';

export const delete_cookie = ( name ) => {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const set_1hr_cookie = (name, data) => {
	let expireDate = new Date();
	expireDate.setTime(expireDate.getTime() + 60 * 60 * 1000);
	document.cookie = `${name}=${JSON.stringify(data)}; expires=${expireDate.toUTCString()}; path=/`;
}


export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const authenticate = (data, next) => {
	if(typeof window !== "undefined") {
 	
 		//set_1hr_cookie is a self-defined function where t is the name of the item to add
		set_1hr_cookie("jwt", data);

		//We can set local storage with our data but lets use our cookies
		//localStorage.setItem("jwt", JSON.stringify(data));
		next();
	}
}

export const signout = (next) => {
	if(typeof window !== "undefined") {
		// localStorage.removeItem("jwt");

		//delete cookie - pass the name of the item to remove
		delete_cookie("jwt");
		next();
		return fetch(`${API}/signout`, {
				method: "GET"
			})
			.then(response => {
				console.log("signout", response);
			})
			.catch(err => {
				console.log(err);
			});		
	}
}

export const isAuthenticated  = () => {
	if(typeof window == "undefined") {
		return false;
	}
	if(Cookies.get('jwt')) {
		return JSON.parse(Cookies.get('jwt'));
	} else {
		return false;
	}
}

