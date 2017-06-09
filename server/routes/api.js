const express = require('express');

const router = new express.Router();

let fixtures = {"elements":[{"id":1,"position":{"x":300,"y":100},"text":{"name":"Person","type":"interface","attributes":[{"name":"name","type":"string","value":"Alex","scope":"public"},{"name":"age","type":"int","value":"100"},{"name":"wife","scope":"protected","type":"any"}],"methods":[{"name":"helloWorld","type":"int"},{"name":"foo","type":"string","args":[{"name":"name","type":"string","value":"Alex"},{"name":"age","type":"int","value":"100"},{"name":"wife","type":"any"},{"name":"wife","type":"any"}]}]}},{"id":2,"position":{"x":600,"y":300},"text":{"name":"Creature","attributes":[{"name":"name","type":"string"}]}}],"connections":[{"id":1,"type":"inheritance","from":{"id":1,"role":"foo","indicator":"2"},"to":{"id":2,"role":"bar","indicator":"1..*"},"text":"inherits"}]};
let message = JSON.stringify(fixtures);

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message
  });
});

router.get('/diagrams/*', (req, res) => {
	// extract diagram from database and send
});

module.exports = router;
