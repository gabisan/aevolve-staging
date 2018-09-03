// controller.js
angular
.module('app')
.controller('navController', navController)
.controller('scrollController', scrollController);

navController.$inject = ['$scope'];
function navController($scope) {
  $scope.isNavCollapsed = true;
};

scrollController.$inject = ['$scope', '$document', '$state', '$rootScope'];
function scrollController($scope, $document, $state, $rootScope) {
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
};
