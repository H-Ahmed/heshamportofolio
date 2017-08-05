var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});


// SERVICES
weatherApp.service('cityService', function(){
    this.city = "London"
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;

    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    $scope.weatherAPI = $resource("https://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK"}, {get:{method: "JSONP"}});
    $scope.weatherResault = $scope.weatherAPI.get({q: $scope.city, cnt:$scope.days, APPID: "cf195513e40a544c58c3c38ea61f4c73"});

    $scope.convertToDate = function(dt){
        return new Date(dt * 1000)
    }
    $scope.convertToFahrenheit = function(degk) {
        return Math.round(degk - 273);
    }
}]);