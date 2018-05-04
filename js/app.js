angular
    .module('hgnApp',['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
        .when("/page2", {
            templateUrl : "page2.html",
            controller : "page2Crtl"
        })    
        .when("/home", {
            templateUrl : "home.html",
            controller : "homeCrtl"
        });
    })
    .controller('MainCtrl', function($scope) {
        console.log('This is a log from controller')
    })
    .controller('InputTexttoFilter',function($scope){

        $scope.addtext = function(textProduct){
            $scope.textProduct.push($scope)
        }

    })
    .controller('page2Crtl', function ($scope) {
        $scope.msg = "page2Crtl";
    })
    .controller('homeCrtl', function ($http,$scope) {
        
        $scope.products = [];

        $http.get('/dataset.json').then(function(data){
            $scope.products = data.data;
            console.log(data)
        })
    });;
   

    