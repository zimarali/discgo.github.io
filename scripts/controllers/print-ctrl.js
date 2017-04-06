var app = angular.module('discGo');

app.controller('printCtrl', function($scope, discGoFactory){

  var artist = discGoFactory.getArtistName();
  var tmURL = discGoFactory.getUrl();
  var tmURLFixed = encodeURI(tmURL);

  $scope.onTourUrl = tmURLFixed;


  $scope.artistInfo = discGoFactory.searchArtist(artist).then(function(resp){
    console.log(resp);
    $scope.artist = resp.artist.name;
    $scope.artistBio = resp.artist.bio.summary;
    $scope.artistImage = resp.artist.image[4]["#text"];
    $scope.onTourData = resp.artist.ontour;
  });

  $scope.albumInfo = discGoFactory.searchAlbum(artist).then(function(resp){
    console.log(resp);
    $scope.albumName1 = resp.topalbums.album["0"].name;
    $scope.albumName2 = resp.topalbums.album["1"].name;
    $scope.albumName3 = resp.topalbums.album["2"].name;
    $scope.albumName4 = resp.topalbums.album["3"].name;
    $scope.albumName5 = resp.topalbums.album["4"].name;
    $scope.albumName6 = resp.topalbums.album["5"].name;
    $scope.albumImage1 = resp.topalbums.album["0"].image[2]["#text"];
    $scope.albumImage2 = resp.topalbums.album["1"].image[2]["#text"];
    $scope.albumImage3 = resp.topalbums.album["2"].image[2]["#text"];
    $scope.albumImage4 = resp.topalbums.album["3"].image[2]["#text"];
    $scope.albumImage5 = resp.topalbums.album["4"].image[2]["#text"];
    $scope.albumImage6 = resp.topalbums.album["5"].image[2]["#text"];
    $scope.albumUrl1 = resp.topalbums.album["0"].url;
    $scope.albumUrl2 = resp.topalbums.album["1"].url;
    $scope.albumUrl3 = resp.topalbums.album["2"].url;
    $scope.albumUrl4 = resp.topalbums.album["3"].url;
    $scope.albumUrl5 = resp.topalbums.album["4"].url;
    $scope.albumUrl6 = resp.topalbums.album["5"].url;
  });

  $scope.tracksInfo = discGoFactory.searchTracks(artist).then(function(resp){
    console.log(resp);
    $scope.trackName1 = resp.toptracks.track["0"].name;
    $scope.trackName2 = resp.toptracks.track["1"].name;
    $scope.trackName3 = resp.toptracks.track["2"].name;
    $scope.trackName4 = resp.toptracks.track["3"].name;
    $scope.trackName5 = resp.toptracks.track["4"].name;
    $scope.trackName6 = resp.toptracks.track["5"].name;
    $scope.trackName7 = resp.toptracks.track["6"].name;
    $scope.trackName8 = resp.toptracks.track["7"].name;
    $scope.trackName9 = resp.toptracks.track["8"].name;
    $scope.trackName10 = resp.toptracks.track["9"].name;
    $scope.trackUrl1 = resp.toptracks.track["0"].url;
    $scope.trackUrl2 = resp.toptracks.track["1"].url;
    $scope.trackUrl3 = resp.toptracks.track["2"].url;
    $scope.trackUrl4 = resp.toptracks.track["3"].url;
    $scope.trackUrl5 = resp.toptracks.track["4"].url;
    $scope.trackUrl6 = resp.toptracks.track["5"].url;
    $scope.trackUrl7 = resp.toptracks.track["6"].url;
    $scope.trackUrl8 = resp.toptracks.track["7"].url;
    $scope.trackUrl9 = resp.toptracks.track["8"].url;
    $scope.trackUrl10 = resp.toptracks.track["9"].url;
  });

});

app.directive("onTour", function(){
  return {
    template: 'ON TOUR!'
  };
});

app.directive('anchorSmoothScroll', function($location) {
    'use strict';

    return {
        restrict: 'A',
        replace: false,
        scope: {
            'anchorSmoothScroll': '@'
        },

        link: function($scope, $element, $attrs) {

            initialize();

            /* initialize -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function initialize() {
                createEventListeners();
            }

            /* createEventListeners -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function createEventListeners() {
                // listen for a click
                $element.on('click', function() {
                    // set the hash like a normal anchor scroll
                    $location.hash($scope.anchorSmoothScroll);

                    // smooth scroll to the passed in element
                    scrollTo($scope.anchorSmoothScroll);
                });
            }

            /* scrollTo -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function scrollTo(eID) {

                // This scrolling function
                // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

                var i;
                var startY = currentYPosition();
                var stopY = elmYPosition(eID);
                var distance = stopY > startY ? stopY - startY : startY - stopY;
                if (distance < 100) {
                    scrollTo(0, stopY); return;
                }
                var speed = Math.round(distance / 100);
                if (speed >= 20) speed = 20;
                var step = Math.round(distance / 25);
                var leapY = stopY > startY ? startY + step : startY - step;
                var timer = 0;
                if (stopY > startY) {
                    for (i = startY; i < stopY; i += step) {
                        setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
                        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                    } return;
                }
                for (i = startY; i > stopY; i -= step) {
                    setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
                    leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
                }
            }

            /* currentYPosition -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (window.pageYOffset) {
                    return window.pageYOffset;
                }
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop) {
                    return document.documentElement.scrollTop;
                }
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) {
                    return document.body.scrollTop;
                }
                return 0;
            }

            /* scrollTo -
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }
        }
    };
});

app.filter('unsafe', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };

});
