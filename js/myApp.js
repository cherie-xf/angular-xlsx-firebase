var app = angular.module('MyApp', ['firebase','xlsx-model','smart-table']);


app.controller("mainCtrl", function($scope, $firebaseObject) {
  var ref = firebase.database().ref().child("data");
  // download the data into a local object
  var syncObject = $firebaseObject(ref);
  var nameMap = new Map();
  nameMap.set('Location ID', 'locationId');
  nameMap.set('Meter ID', 'meterId');
  nameMap.set('User', 'user');
  nameMap.set('Group Name', 'group');
  nameMap.set('Reason', 'reason');
  nameMap.set('Date', 'date');
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");
  $scope.$watch('excel', function(newData, oldData){
    if(newData && Object.keys(newData).length > 0){
      console.log('new data input');
      $scope.data = parseData(newData);
    }
  });
  function parseData(data){
    var sheets = Object.values(data).length > 0 ? Object.values(data)[0] : {};
    var data = [];
    if(sheets){
      angular.forEach(sheets, function(pageData){
        var formatedPageData = pageData.map(function(row){
          var formatedRow = {};
          angular.forEach(row, function(v,k){
            if(nameMap.get(k) && v){
              formatedRow[nameMap.get(k)] = v;
            }
          });
          return formatedRow;
        });
       data = data.concat(formatedPageData);
      });
    }
    return data;
  }
});
