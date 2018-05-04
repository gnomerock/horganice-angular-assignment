angular
    .module('hgnApp',[])
    .controller('MainCtrl', function($scope) {
        console.log('This is a log from controller')
    })
    .controller('FechtRow',function($http,$scope){
       
        $scope.products = [];

        $http.get('/dataset.json').then(function(data){
            $scope.products = data.data;
            console.log(data)
        })

    })
    .controller('InputTexttoFilter',function($scope){

        $scope.addtext = function(textProduct){
            $scope.textProduct.push($scope)
        }

    })
   

    