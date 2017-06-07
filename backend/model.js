'use strict';

let sha3 = require('crypto-js/sha3');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dolphin');
let db = mongoose.connection;
let gun = require('./gun');
let storage = gun.get('model');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected!')
});

let User = mongoose.model('user', {
	name: String,
	surname: String,
	login: String,
	password: String,
	diagrams: []
});

let diagram = {
	name: 'ClassDiagram1',
	type: 'class',
	data: JSON.stringify(require('./fixtures'))
}

new User({
	name: 'John',
	surname: 'Doe',
	login: 'hello',
	password: sha3('hello').toString(),
	diagrams: [diagram]
}).save();

function createUser(schema) {
	new User(schema).save();
}

// function setData(login, password, data) {
// 	User.findOneAndUpdate({
// 		login: login,
// 		password: password
// 	}, {
// 		diagrams: 
// 	}).exec();
// }

function getData(login, password, callback) {

	User.findOne({
		login: login,
		password: password

	}, function (err, user) {
		let data;
		if (err || !user) {

			data = {
				'fixtures': null,
				'error': err || null
			};

		} else {

			data = {
				'fixtures': user.diagrams[0].data,
				'error': null
			};
		}
		callback(data);
	});
}

module.exports = {
	getData
}
