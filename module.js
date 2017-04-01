var app = angular.module('discGo', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/search', {
      controller: 'artistCtrl',
      templateUrl: 'views/search-view.html'
    })
    .when('/result', {
      controller: 'printCtrl',
      templateUrl: 'views/artist-view.html'
    })
    .when('/about', {
      templateUrl: 'views/about-view.html'
    })
    .otherwise({redirectTo:'/search'});

$locationProvider.hashPrefix("");

});
