function NpvCtrl ($scope, $http){

  var npvFunction = function (rate, cf0) {
    console.log('called', arguments)
    var rate = rate/100, npv = cf0;
    for (var i = 2; i < arguments.length; i++){
      npv +=(arguments[i] / Math.pow((1 + rate), i - 1));
    }
    console.log(npv*100)
    return (Math.round(npv * 100) / 100);
  };


  $scope.calculateNPV = function(){
    console.log($scope.npv);
    var rate = $scope.npv.rate;
    var cf0 = $scope.npv.cf0;
    var cf1 = $scope.npv.cf1;
    var cf2 = $scope.npv.cf2;
    var cf3 = $scope.npv.cf3;

    var npvValue = npvFunction(Number(rate), Number(cf0), Number(cf1), Number(cf2), Number(cf3));
    console.log('npvValue', npvValue);
    
    

  };

  $scope.renderNPV = function (response){
    $scope.npv = response; 
  };

  $http.get('/npvs')
    .success($scope.renderNPV);
};