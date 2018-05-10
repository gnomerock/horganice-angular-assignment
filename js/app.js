angular
    .module('hgnApp',['ngRoute', 'LocalStorageModule'])
    .config(function($routeProvider) {
        $routeProvider
        .when("/page2/:apartmentId", {
            templateUrl : "page2.html",
            controller : "page2Crtl"
        })    
        .when("/home", {
            templateUrl : "home.html",
            controller : "homeCrtl"
            
        })
        .when("/insertpage", {
            templateUrl : "insertpage.html",
            controller : "insertCtrl"
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
    .controller('page2Crtl', function ($http,$scope,$routeParams,Apartment) {
        $scope.msg = "page2Crtl";
        $scope.apartmentId = $routeParams.apartmentId;
        console.log($scope.apartmentId)
        $scope.apartments = [];
        
        Apartment.loadApartment().then(function(apartments){
            $scope.apartments = apartments
            $scope.filteredApartment = apartments
            console.log($scope.apartments)

            for(var product of $scope.apartments){

                console.log(product.apartmentId)
                console.log($scope.apartmentId)

                if(product.apartmentId == $scope.apartmentId){
                    $scope.product = product
                    $scope.$apply()
                    console.log('test',product)
                }
            }

            if(!$scope.apartments){
                $scope.isPagenotfound = true;
            }

        })

        // $http.get('/dataset.json').then(function(data){
        //     $scope.products = data.data;
        //     console.log($scope.products)

        //     for(var product of $scope.products){

        //         console.log(product.apartmentId)
        //         console.log($scope.apartmentId)

        //         if(product.apartmentId == $scope.apartmentId){
        //             $scope.product = product
        //             console.log(product)
        //         }
        //     }

        //     if(!$scope.product){
        //         $scope.isPagenotfound = true;
        //     }
        // })

    })
    .controller('homeCrtl', function ($rootScope,$http,$scope,Apartment) {
        
        
        $scope.apartments = [];

        Apartment.loadApartment().then(function(apartments){
            $scope.apartments = apartments
            $scope.filteredApartment = apartments
            console.log($scope.apartments)
        })
        
        $rootScope.$on('clickRef',function(){
            console.log('ready to load')
            Apartment.loadApartment().then(function(apartments){
                $scope.apartments = apartments
                $scope.filteredApartment = apartments
                console.log($scope.apartments)
            })
    
        })

        $scope.myFunc = function(inputtext) {
            $scope.filteredApartment = $scope.apartments.filter(function(apartment){ 
                return  (apartment.apartmentName.indexOf(inputtext) > -1)
                
            });
        };
        
    })
    .controller('insertCtrl', function($rootScope,$scope, localStorageService, Apartment) {
        //...set
        $scope.inputName = "";
        $scope.submit = function(apartmentName,apartmentAdr,apartmentPhone){
            localStorageService.set('setName', apartmentName);
            localStorageService.set('setAdr', apartmentAdr);
            localStorageService.set('setPhone', apartmentPhone);
            console.log(localStorageService.get('setName'));
            console.log(localStorageService.get('setAdr'));
            console.log(localStorageService.get('setPhone'));

            // var storedNames = JSON.parse(localStorageService.get('setName'));
            // var storedAdr = JSON.parse(localStorageService.get('setAdr'));
            // var storedPhone = JSON.parse(localStorageService.get('setPhone'));

            var apartmentObj = {
                "apartmentId": "M160KSD0s2",
                "apartmentName": apartmentName,
                "apartmentAddress": apartmentAdr,
                "apartmentPhoneNo": apartmentPhone,
                "apartmentpic": "http://www.clker.com/cliparts/p/4/O/v/Y/H/tall-building-hi.png"
            }

            Apartment.addApartment(apartmentObj)
            //ref หน้า home
            $rootScope.$emit('clickRef')
        }
        
        //...
      })
      .factory('Apartment', function ($http) {
        var apartments = []
        var isLoad = false

        return {
            getApartment: function(){
                return apartments
            },
            loadApartment: function(){

                if(isLoad){
                    return Promise.resolve(this.getApartment())
                }else{
                    return $http.get('/dataset.json').then(function(data){
                        apartments = data.data
                        isLoad = true
                        return Promise.resolve(apartments)
                   })
                }
            },
            addApartment: function(name){
                //
                apartments.push(name)
            }
        }
      });

   

    