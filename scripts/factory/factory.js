var app = angular.module('discGo');

app.factory('discGoFactory', function($http) {

  var artistName = "";
  var ticketMaster = "";

  return {
      searchArtist: searchArtist, // name of the function pulling the artist data from the api
      returnArtistData: returnArtistData, // name of the function that returns artistData
      searchAlbum: searchAlbum, // name of the function pulling the top album data from the api
      returnAlbumData: returnAlbumData, // name of the function that returns topAlbumData
      searchTracks: searchTracks,
      returnTracksData: returnTracksData,
      storeArtistName: storeArtistName,
      getArtistName: getArtistName,
      storeUrl: storeUrl,
      getUrl: getUrl
    };

  function searchArtist(searchCriteria) {
      var promise = $http({
        method: 'GET',
        url: 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + searchCriteria + '&api_key=2f32cf4dbf47aa1b214b2cb2d18f9e24&autocorrect=1&format=json'
      }).then(function successCallback(response) {
        artistObject = response;
        return artistObject.data;
      });
      return promise;
    }

  function returnArtistData() {
    return artistObject;
  }

  function searchAlbum(searchCriteria) {
      var promise = $http({
        method: 'GET',
        url: 'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + searchCriteria + '&api_key=2f32cf4dbf47aa1b214b2cb2d18f9e24&autocorrect=1&limit=10&format=json'
      }).then(function successCallback(response) {
        albumObject = response;
        return albumObject.data;
      });
      return promise;
    }

    function searchTracks(searchCriteria) {
      var promise = $http({
        method: 'GET',
        url: 'https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + searchCriteria + '&api_key=2f32cf4dbf47aa1b214b2cb2d18f9e24&autocorrect=1&limit=10&format=json'
      }).then(function successCallback(response) {
        tracksObject = response;
        return tracksObject.data;
      });
      return promise;
    }

  function returnTracksData(){
    return tracksObject;
  }


  function returnAlbumData(){
    return albumObject;
  }

  function storeArtistName(name){
    artistName = name;
  }

  function getArtistName(){
    return artistName;
  }

  function storeUrl(searchCriteria) {
    ticketMaster = 'http://www.ticketmaster.com/search?tm_link=tm_header_search&user_input=' + searchCriteria + '&q=' + searchCriteria;
  }

  function getUrl(){
    return ticketMaster;
  }

});
