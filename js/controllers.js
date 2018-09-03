// controller.js
angular
.module('app')
.controller('navController', navController)
.controller('countdownController', countdownController);

navController.$inject = ['$scope'];

function navController($scope) {
  $scope.isNavCollapsed = true;
};

countdownController.$inject = ['$scope','moment'];
function countdownController($scope,moment) {

  setInterval( function() {
    var countDownDate = new Date("Sep 5, 2018 15:37:25");
    var now           = moment(new Date()).toDate();

    var e = moment(countDownDate).toDate();
    var d = $scope.calculateTime(now, e);

    var day       = document.getElementById('days');
    day.innerHTML = d.days;

    var hour       = document.getElementById('hours');
    hour.innerHTML = d.hours;

    var minute       = document.getElementById('minutes');
    minute.innerHTML = d.minutes;

    var second = document.getElementById('seconds');
    second.innerHTML = d.seconds;

  }, 1000);

  $scope.calculateTime = function (start, end) {

    var t       = Date.parse(end) - Date.parse(start);
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours   = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days    = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
};
