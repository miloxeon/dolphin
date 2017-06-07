'use strict';

import gun from './model'; 

export function checkAuth() {
	return localStorage.getItem('login') && localStorage.getItem('password');
}

export function getLogin() {
	if (!localStorage.getItem('login')) {
		localStorage.setItem('login', prompt('Enter login'));
	}
	return localStorage.getItem('login');
}

export function getPassword() {
	if (!localStorage.getItem('password')) {
		localStorage.setItem('password', sha3(prompt('Enter password')).toString());
	}
	return localStorage.getItem('password');
}

export function auth(login, password, callback) {
	gun.get('credentials').put(null);
	gun.get('credentials').put({
		login,
		password
	});

	storage.get('error').on(function (data) {
		if(!data) {
			callback();
		} else {
			console.warn(data);
		}
	});
}
