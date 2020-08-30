var { Gpio } = require( 'onoff' );
var admin = require("firebase-admin");

// set BCM 4 pin as 'output'
const led = new Gpio( '21', 'out' );
const button = new Gpio( '20', 'in', 'both' );

//const iv = setInterval(_ => led.writeSync(led.readSync() ^ 1), 200);

// button.watch((err, value) => led.writeSync(value));

console.log("test");


// Fetch the service account key JSON file contents
var serviceAccount = require("./home-e1e31-2fd925e355e0.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://home-e1e31.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/");
ref.once("value", function(snapshot) {
  	console.log(snapshot.val());
});

ref.on('child_changed',function(childsnapshot,prevchildname){
	console.log("event occured1: "+childsnapshot);
	childsnapshot.forEach((u, key) => {
	    // u contains your user data object which is like u.uid and u.email or whatever keys you got.
	    console.log(key, 'key here contains the strange "firebase array index key"');
	    console.log(u.val());
    });
})

var ref = db.ref("/data");
ref.on('value',function(childsnapshot,prevchildname){
	console.log("event occured2: "+childsnapshot.val());
	childsnapshot.forEach((u, key) => {
	    // u contains your user data object which is like u.uid and u.email or whatever keys you got.
	    console.log(key, 'key here contains the strange "firebase array index key"');
	    console.log(u.val());
    });
    if(childsnapshot.val() == 2) {
    	setIntervalTimes(function() {
    		led.writeSync(led.readSync() ^ 1);
    	}, 400, 10);
    } else {

    }
})


function setIntervalTimes(callback, delay, repetitions) {
    var x = 0;
    var intervalID = setInterval(function () {

       callback();

       if (++x === repetitions) {
           clearInterval(intervalID);
       }
    }, delay);
}