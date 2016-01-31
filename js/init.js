//(function($){
//  $(function(){
//
//    $('.button-collapse').sideNav();
//    $('.parallax').parallax();
//
//  }); // end of document ready
//})(jQuery); // end of jQuery name space

app = angular.module('yo_fe', ['yoServices']);
app.controller('smallMenuController', ['$scope', function($scope) {
  $scope.onclick = function() {
    t = $('.toggle-menu')
    if (t.css('display') === 'none') {
      t.css("display", "block")
    } else {
      t.css('display', 'none')
    }
  };
}]);
app.controller('largeCurrentController', ['$scope', '$location', function($scope, $location) {
    m = $location.absUrl().match(/\/(index\.html|profile\.html|music\.html)$/);
    current = "index.html"
    if (m !== null) {
        current = m[1]
    }
    $(".menu").children("a[href='" + current + "']").find("img").css("display", "inline");
}]);
app.controller('smallCurrentController', ['$scope', '$location', function($scope, $location) {
  $scope.obj={current: currentPath($location)}
}]);

function currentPath($location) {
  url = $location.absUrl()
  current = "Top"
  if (/\/profile\.html$/.test(url)) {
    current = "Profile"
  }
  if (/\/live\.html$/.test(url)) {
    current = "Live"
  }
  if (/\/music\.html$/.test(url)) {
    current = "Music"
  }
  if (/\/works\.html$/.test(url)) {
    current = "Works"
  }
  if (/\/contact\.html$/.test(url)) {
    current = "Contact"
  }
  return current;
}

app.controller('newsToggleController', ['$scope', function($scope) {
  $(".news-title").on("click", function(e){
    target=$(e.currentTarget);
    body=target.closest('li').find('.news-body')
    body.toggle();
    target.toggleClass("toggle");
  });
}]);

angular.module('yoServices', []).service('itunes', ['$http', function ($http) {
  this.get_album = function (query, callback) {
    var url = 'https://itunes.apple.com/lookup?callback=JSON_CALLBACK&entity=song&country=JP&id=' + query;
    return $http.jsonp(url).then(
      function (response) {
        albumInfo = {};
        songs = [];
        $.each(response.data.results, function(index, object){
          if (object.collectionType !== undefined && object.collectionType === "Album") {
            albumInfo = object;
          }
          if (object.kind !== undefined && object.kind === "song") {
            songs.push(object);
          }
        });
        songs.sort(function(a, b){
          if(a.trackNumber < b.trackNumber) return -1;
          if(a.trackNumber > b.trackNumber) return 1;
          return 0;
        });
        return {info: albumInfo, songs: songs};
      },
      function (response) {
        alert(response.data.message);
        return {info: {}, songs: []};
      }
    );
  }
}]);

app.controller('itunesController', ['$scope', 'itunes', '$sce', '$element', function ($scope, itunes, $sce, $element) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
  itunes.get_album($element.attr("data-itunes-id")).then(function(res){
    console.log(res);
    $scope.album = res;
  })
}]);
