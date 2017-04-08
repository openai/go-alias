
var encoder = require('firebase-encode');
var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");

// Handle escaped new lines in private key
var firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY
if (firebasePrivateKey.search(/\\n/) != -1) {
    firebasePrivateKey = firebasePrivateKey.replace(/\\n/g, '\n')
}

admin.initializeApp({
    credential: admin.credential.cert({
	projectId: process.env.FIREBASE_PROJECT_ID,
	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	privateKey: firebasePrivateKey
  }),
  databaseURL: `https://${process.env.FIREBASE_DATABASE_NAME}.firebaseio.com`
});


var db = admin.database();
var linksRef = db.ref('links');

/* GET home page. */
router.get('/', function(req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host')
    res.render('welcome', {path: fullUrl})
})

/* For some reason this never gets pull even with link rel=search tag
https://developer.mozilla.org/en-US/Add-ons/Creating_OpenSearch_plugins_for_Firefox
*/
router.get('/opensearch.xml', function(req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host')
    res.render('opensearch', {path: fullUrl})
})

router.get('/:id', function(req, res, next) {
    linksRef.child(req.params.id).once('value').then(function(dataSnapshot) {
	if (dataSnapshot.exists()) {
	    res.redirect(encoder.decode(dataSnapshot.val()))
	} else {
	    res.render('index', { title: req.params.id })
	}
    });

});

function getId(path) {
    return path.split('/', 2)[1]
}

function getURL(path) {
    for (var i = 1; i < path.length; i++) {
	if (path[i] == '/') {
	    return path.substring(i+1)
	}
    }
    return ''
}

router.get(/.*/, function(req, res, next) {
    var id = getId(req.path)
    var url = getURL(req.path)
    // make sure this ID isn't already taken
    // linksRef.child(req.params.id).once('value').then(function(dataSnapshot) {
    // 	if (dataSnapshot.exists()) {
    // 	    res.redirect(dataSnapshot.val())
    // 	} else {
    // 	    // Success.
    // 	}
    // });

    // Clobber
    if (!url.match(/https?/)) {
	url = 'http://' + url
    }
    linksRef.child(id).set(encoder.encode(url));
    res.render('index', { title: id, url: url })


});

module.exports = router
