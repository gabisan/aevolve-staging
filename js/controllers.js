// controller.js
angular
.module('app')
.controller('navController', navController)
.controller('scrollRevealController', scrollRevealController);
navController.$inject = ['$scope','$window'];
function navController($scope,$window) {
  if ($window.innerWidth > 991) {
   $scope.isNavCollapsed = false;
  } else {
      $scope.isNavCollapsed = true;
  }
   console.log($scope.isNavCollapsed);
};
scrollRevealController.$inject = ['$scope', 'ScrollReveal', '$timeout' ];
function scrollRevealController($scope, ScrollReveal, $timeout) {
  $scope.optionsgoUp = {
    origin: 'bottom',
    distance : '200px',
    delay: 50,
    scale: 1,
    duration: 3000,
    reset: true
  }
  $scope.optionsgoOpacity = {
    distance: '0px',
    delay: 50,
    reset: true,
    opacity: 0,
    scale: 1,
    duration: 1000
  }

  $scope.optionsgoZoom = {
    distance: '0px',
    delay: 100,
    scale: 0.1,
    duration: 1000,
    reset: true
  }
};
