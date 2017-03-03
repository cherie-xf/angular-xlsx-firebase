var app = angular.module('MyApp', ['firebase','xlsx-model']);


app.controller("mainCtrl", function($scope, $firebaseObject) {
  var ref = firebase.database().ref().child("data");
  // download the data into a local object
  var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");
});