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

    var message = 'For given discount rate '+rate+'%, cashflow for first year '+cf0+' cashflow for second year '+cf1+' cashflow for third year '+cf2+' , and cashflow for fourth year '+cf3+': the Net Present Value (NPV) is '+npvValue+'.' ;
    
    $('#results').html(message);

    if (npvValue > 0) {
      $('#status').removeClass('alert alert-danger');
      $('#status').html('Worth it!').addClass('alert alert-success');
    } else {
      $('#status').removeClass('alert alert-success');
      $('#status').html('Not Worth it!').addClass('alert alert-danger');
    }

  };

  $scope.renderNPV = function (response){
    $scope.npv = response; 
  };

  $http.get('/npvs')
    .success($scope.renderNPV);
};