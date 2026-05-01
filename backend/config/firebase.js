// Imports firebase-admin sdk to interact with firebase services
const admin = require('firebase-admin');

/*Imports the service account credentials into a variable 
  to connect backend to firebase */
const serviceAccount = require('./serviceAccountKey.json');

// Initializes the app using serviceAccount credientials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Variable returning a firestore database instance
const db = admin.firestore();

// Allows other files to use this variable (database)
module.exports = db;