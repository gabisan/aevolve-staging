angular
  .module('app')
  .filter('secondsToDateTime', [function() {
    return function(seconds) {
      return new Date(1970, 0, 1).setSeconds(seconds);
    };
  }])
  .filter('numberFixed', function () {
    return function (n, len) {
      var num = parseInt(n, 10);
      len = parseInt(len, 10);
      if (isNaN(num) || isNaN(len)) {
        return n;
      }
      num = '' + num;
      while (num.length < len) {
        num = '0' + num;
      }
      return num;
    };
  });

