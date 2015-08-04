var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');
var github_user_url = 'https://api.github.com/search/users';

function isLetter(character) {
	character = character.toLowerCase();
	return character.length === 1 && character.match(/[a-z]/i)
}

/* GET q search github */
router.get('/', function(req, res, next) {
	var q = req.query.q;
	var options = {
		url: github_user_url + '?q=' + q,
		headers: {
			'User-Agent': 'eq-test'
		}
	}

	var letters = {
		"a": 0, "b": 0, "c": 0,"d": 0, "e": 0, "f": 0, "g": 0, "h": 0, "i": 0, 
		"j": 0, "k": 0, "l": 0, "m": 0, "n": 0, "o": 0, "p": 0, "q": 0, "r": 0, 
		"s": 0, "t": 0, "u": 0, "v": 0, "w": 0, "x": 0, "y": 0, "z": 0, "other": 0
	}

	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	// Lodash to sort by login
	    var items = _.sortBy(JSON.parse(body).items, 'login');

	    // Get max 5
	    items = items.slice(0, 5);
	    // Get logins by themselves
	    for(var i = 0; i < items.length; i++) {
	    	// Loop through name characters
	    	for(var j = 0; j < items[i].login.length; j++) {
	    		
	    		if(isLetter(items[i].login[j]))
	    			letters[items[i].login[j]] += 1;
	    		else
	    			letters["other"] += 1;
	    	}
	    }

	    var toSend = [];
	    for(var letter in letters) {
	    	if(letters.hasOwnProperty(letter)) {
	    		toSend.push({
	    			letter: letter,
	    			value: letters[letter]
	    		});
	    	}
	    }

	    _.sortBy(toSend, 'letter');
	    toSend = toSend.slice(0, 27);
	    console.log(toSend);

	    res.setHeader('Content-Type', 'application/json');
	    res.send(JSON.stringify(toSend));
	  } else {
	  	res.send("Something failed");
	  }
	});


});

module.exports = router;
