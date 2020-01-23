import {API} from "../config.js";
import {set_1hr_cookie} from "../auth/index.js";
import Cookies from 'js-cookie';

export const read = (userId, token) => {
	return fetch(`${API}/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
	.then(response => {
		return response.json();
	})
	.catch(err => console.log(err));
}

export const update = (userId, token, user) => {
	return fetch(`${API}/user/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(user)
	})
	.then(response => {
		return response.json();
	})
	.catch(err => console.log(err));
}

export const updateUser = (user, next) => {
	if(typeof window !== "undefined") {
		if(Cookies.get('jwt')) {
			let auth = JSON.parse(Cookies.get('jwt'));
			auth.user = user;
			console.log(auth);
			set_1hr_cookie("jwt", auth);
			next();
		}
	}
};

export const getPurchaseHistory = (userId, token) => {
	return fetch(`${API}/orders/by/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
	.then(response => {
		return response.json();
	})
	.catch(err => console.log(err));
};