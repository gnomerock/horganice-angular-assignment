angular
    .module('hgnApp',['ngRoute', 'LocalStorageModule', 'angular-md5'])
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
    .controller('page2Crtl', function ($http,$scope,$routeParams,Apartment,localStorageService) {
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

        $scope.delFunc = function(idFordel) {
            Apartment.deleteApartment(idFordel)
        }
        
        $scope.editFunc = function(idApat,nameApat,adrAprt,phoneAprt) {
            Apartment.editApartment(idApat,nameApat,adrAprt,phoneAprt)
        }


    })
    .controller('homeCrtl', function ($rootScope,$http,$scope,Apartment) {
        
        
        $scope.apartments = [];

        Apartment.loadApartment().then(function(apartments){
            
            $scope.apartments = apartments
            $scope.filteredApartment = apartments
            console.log($scope.apartments)
            $scope.myFunc('')
        })
        
        $rootScope.$on('clickRef',function(){
            console.log('ready to load')
            Apartment.loadApartment().then(function(apartments){
                
                $scope.apartments = apartments
                $scope.filteredApartment = apartments
                console.log($scope.apartments)
                $scope.myFunc('')
            })
    
        })

        $scope.myFunc = function(inputtext) {
            console.log('type input',typeof inputtext)
            // window.localStorage.removeItem("cast");
            if(inputtext==""){
                $scope.filteredApartment = $scope.apartments
                $scope.$apply()
                console.log('data " " ',$scope.filteredApartment)

            }else{
                $scope.filteredApartment = $scope.apartments.filter(function(apartment){ 
                    return  (apartment.apartmentName.indexOf(inputtext) > -1)
                });
            }

        };
        
    })
    .controller('insertCtrl', function($rootScope,$scope, localStorageService, Apartment,md5) {
        //...set
        $scope.inputName = "";
        $scope.submit = function(apartmentName,apartmentAdr,apartmentPhone){

            var apartmentObj = {

                "apartmentId":  md5.createHash(apartmentName + new Date() || ''),
                "apartmentName": apartmentName,
                "apartmentAddress": apartmentAdr,
                "apartmentPhoneNo": apartmentPhone,
                "apartmentpic": "http://www.clker.com/cliparts/p/4/O/v/Y/H/tall-building-hi.png"
            }

            Apartment.addApartment(apartmentObj)
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
                    

                   if(!localStorage.getItem("cast")){
                        return $http.get('/dataset.json').then(function(data){
                            apartments = data.data
                            return Promise.resolve(apartments)
                        })
                    }else{
                        //
                        apartments = JSON.parse(localStorage.getItem("cast"))
                        return Promise.resolve(apartments)
                    }
                    
                }
            },
            addApartment: function(name){
                //
                apartments.push(name)
                localStorage.setItem("cast", JSON.stringify(apartments));
                console.log(JSON.parse(localStorage.getItem("cast")))
            },

            deleteApartment: function(id) {
                
                console.log('id send',id)
                for(var apartment of apartments){
                    if(apartment.apartmentId == id){
                        apartments.splice( apartments.indexOf(apartment.apartmentId) );
                    }
                }
                console.log('data at del',apartments)
                
                localStorage.setItem("cast", JSON.stringify(apartments));

            },

            editApartment : function(idApat,nameApat,adrAprt,phoneAprt){

                console.log('id,Name,Adr,tel',idApat,nameApat,adrAprt,phoneAprt)

                for(var apartment of apartments){
                    if(apartment.apartmentId == idApat){
                        console.log('do it !!!!!!!')
                        apartment.apartmentName = nameApat
                        apartment.apartmentAddress = adrAprt
                        apartment.apartmentPhoneNo = phoneAprt

                        localStorage.setItem("cast", JSON.stringify(apartments));
                    }
                }

                console.log(apartments)

            }
        }
      });

   

    