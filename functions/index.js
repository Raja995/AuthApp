const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fetch = require('node-fetch');
admin.initializeApp();

exports.addDevice = functions.https.onCall(async (data, context) => {
    userId = data.userId;
    token = data.deviceToken;
    await admin.database().ref('users/' + userId).set({

        deviceToken: token,
        OtpStatus: "Enabled",

    });
    return null;
})
exports.removeDevice = functions.https.onCall(async (data, context) => {
    userId = data.userId;

    await admin.database().ref('users/' + userId).remove();
    return null;
})

exports.addKey = functions.https.onCall(async (data, context) => {

    id = data.userId;
    await admin.database().ref('users/').child(id).update({
        key: data.key,
    })

    return null;
})
exports.getToken = functions.https.onCall(async (data, context) => {

    id = data.userId;
    var res;
    await admin.database().ref('users/').child(id).child('deviceToken').once('value', async function (snapshot) {
        res = await snapshot.val();

    }, function (errorObject) {
        console.log("The Read Failed: " + errorObject.code);
    })

    return res;

})
exports.getKey = functions.https.onCall(async (data, context) => {
    userId = data.userId;

    var res;

    await admin.database().ref('users/').child(userId).child('key').once('value', async function (snapshot) {
        res = await snapshot.val();




    }, function (errorObject) {
        console.log("The Read Failed: " + errorObject.code);
        return null;
    });

    return res;
})
exports.CheckOtpStatus = functions.https.onCall(async (data, context) => {
    userId = data.userId;


    var res;
    await admin.database().ref('users/').child(userId).child('OtpStatus').once('value', async function (snapshot) {
        res = await snapshot.val();




    }, function (errorObject) {
        console.log("The Read Failed: " + errorObject.code);
        return null;
    });
    console.log("Final res : " + res);
    return res;

})

