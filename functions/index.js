const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const secureCompare = require('secure-compare');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.getNewPosts = functions.https.onRequest((req, res) => {
    const key = req.query.key;
  
    // Exit if the keys don't match.
    if (!secureCompare(key, functions.config().cron.key)) {
      console.log('The key provided in the request does not match the key set in the environment. Check that', key,
          'matches the cron.key attribute in `firebase env:get`');
      res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the ' +
          'cron.key environment variable.');
      return null;
    }

    const db = admin.database();
    const ref = db.ref("accounts");

    ref.on("value", function(snapshot) {
        console.log(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    
    // await admin.database().ref('posts').push({1: 'randomData'})
    // Fetch all user details.
    res.send('User cleanup finished');
    return console.log('added data to database');
  });