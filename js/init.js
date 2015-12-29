(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

app = angular.module('yo_fe', []);
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
    m = $location.absUrl().match(/\/(index\.html|profile\.html|live\.html|music\.html|works\.html|contact\.html)$/);
    current = "index.html"
    if (m !== null) {
        current = m[1]
    }
    $(".gloNavi").children("a[href='" + current + "']").find("img").css("display", "inline");
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
