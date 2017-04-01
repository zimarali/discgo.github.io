var app = angular.module('discGo');

app.controller('printCtrl', function($scope, discGoFactory){

  var artist = discGoFactory.getArtistName();


  $scope.artistInfo = discGoFactory.searchArtist(artist).then(function(resp){
    console.log(resp);
    $scope.artist = resp.artist.name;
    $scope.artistBio = resp.artist.bio.summary;
    $scope.artistImage = resp.artist.image[2]["#text"];
    $scope.onTourData = resp.artist.ontour;
  });

  $scope.albumInfo = discGoFactory.searchAlbum(artist).then(function(resp){
    console.log(resp);
    $scope.albumName1 = resp.topalbums.album["0"].name;
    $scope.albumName2 = resp.topalbums.album["1"].name;
    $scope.albumName3 = resp.topalbums.album["2"].name;
    $scope.albumName4 = resp.topalbums.album["3"].name;
    $scope.albumName5 = resp.topalbums.album["4"].name;
    $scope.albumImage1 = resp.topalbums.album["0"].image[1]["#text"];
    $scope.albumImage2 = resp.topalbums.album["1"].image[1]["#text"];
    $scope.albumImage3 = resp.topalbums.album["2"].image[1]["#text"];
    $scope.albumImage4 = resp.topalbums.album["3"].image[1]["#text"];
    $scope.albumImage5 = resp.topalbums.album["4"].image[1]["#text"];
  });

});

app.directive("onTour", function(){
  return {
    template: 'ON TOUR!'
  };
});

app.filter('unsafe', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };

});