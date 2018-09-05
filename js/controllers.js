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
  // $scope.optionsSequence = {
  //   origin: 'left',
  //   distance : '150px',
  //   delay: 30,
  //   scale: 1,
  //   duration: 2000,
  //   reset: true,
  //   sequence: {
  //     selector: '',
  //     interval: 500
  //   }
  // }
  // $timeout(function(){
  //   ScrollReveal.reveal(".fourthTest", {duration: 900}, 300);
  // })
  // $scope.replay = function(){
  //   ScrollReveal.reveal("#idTest", $scope.options);
  // }
};

// scrollController.$inject = ['$scope', '$document', '$state', '$rootScope'];
// function scrollController($scope, $document, $state, $rootScope) {
  // console.log($rootScope.$stateNow);
  // if ($rootScope.$stateNow === 'app.main'){
  //   $scope.mainNav = true;
  // }
    // var duration = 2000; //milliseconds
    // var offset = 30; //pixels; adjust for floating menu, context etc
    // //Scroll to #some-id with 30 px "padding"
    // //Note: Use this in a directive, not with document.getElementById
    // var roadMapAnchor = angular.element(document.getElementById('roadmap'));
    // $scope.toroadMapAnchor = function() {
    //   $document.scrollToElementAnimated(roadMapAnchor, 30, 2000);
    // }
    // var contactAnchor = angular.element(document.getElementById('contact'));
    // $scope.tocontactAnchor = function() {
    //   $document.scrollToElementAnimated(contactAnchor, 30, 2000);
    // }
    // var aboutAnchor = angular.element(document.getElementById('about'));
    // $scope.toaboutAnchor = function() {
    //   $document.scrollToElementAnimated(aboutAnchor, 30, 2000);
    // }
    // $(document).ready(function() {
    //   $("html, body").animate({scrollTop:$(window.location.hash).offset().top-offsetSize }, 500);
    // });
// };
