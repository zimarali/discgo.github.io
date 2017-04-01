var app = angular.module('discGo');

app.controller('artistCtrl', function ($scope, $location, discGoFactory){

  $scope.sendInfo = function(artist) {

    var searchCriteria = artist;

    discGoFactory.searchArtist(searchCriteria);
    discGoFactory.searchAlbum(searchCriteria);
    discGoFactory.storeArtistName(searchCriteria);//Save artist search name


    $location.path('/result');
  }

})
