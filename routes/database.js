var firebase = require("firebase");
exports.init = function() {
    var config = {
        apiKey: "AIzaSyDWxq5D96gxY_wQ94lUXf2-fuzqC4FFvPc",
        authDomain: "recomed-assessment-563a7.firebaseapp.com",
        databaseURL: "https://recomed-assessment-563a7.firebaseio.com/",
        storageBucket: "recomed-assessment-563a7.appspot.com",
    };
    firebase.initializeApp(config);
    console.log('Database Initialized!');
}

exports.fetchData = function(timeMode, callback){
  if (timeMode === 15) {
    firebase.database().ref('/quarterHour').once('value', function(snapshot) {
        callback(snapshot.val());
    })
  } else if (timeMode === 30) {
    firebase.database().ref('/halfHour').once('value', function(snapshot) {
        callback(snapshot.val())
    })
  } else {
      return 'not a valid time mode!';
  }

}

exports.fetch15Minutes = function(callback) {
    firebase.database().ref('/quarterHour').once('value', function(snapshot) {
        callback(snapshot.val());
    })
}

exports.fetch30Minutes = function(callback) {
    firebase.database().ref('/halfHour').once('value', function(snapshot) {
        callback(snapshot.val())
    })
}

exports.add = function(timeMode, data) {
    if (data.description !== '' || data.description !== undefined) {
        if (data.id !== undefined) {
            if (timeMode === 15) {
                firebase.database().ref('/quarterHour/' + data.id).update({
                    appointment: {
                        description: data.description
                    },
                    removed: true
                })
            } else if (timeMode === 30) {
                firebase.database().ref('/halfHour/' + data.id).update({
                    appointment: {
                        description: data.description
                    },
                    removed: true
                });
            } else {
                return 'not a valid time mode!';
            }
        } else {
            console.log('invalid data');
        }
    }
}


exports.remove = function(timeMode, id) {
    if (timeMode === 15) {
        firebase.database().ref('/quarterHour/' + id).update({
            appointment: {
                description: ''
            },
            removed: true
        })
    } else if (timeMode === 30) {
        firebase.database().ref('/halfHour/' + id).update({
            appointment: {
                description: ''
            },
            removed: true
        });
    } else {
        return 'not a valid time mode!';
    }

}
