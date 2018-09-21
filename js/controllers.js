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
};
scrollRevealController.$inject = ['$scope', 'ScrollReveal', '$timeout', '$uibModal', '$state', 'AuthService'];
function scrollRevealController($scope, ScrollReveal, $timeout, $uibModal, $state, AuthService) {

  $scope.optionsgoUp = {
    origin: 'bottom',
    distance : '200px',
    delay: 50,
    scale: 1,
    duration: 3000,
    reset: true
  };
  $scope.optionsgoOpacity = {
    distance: '0px',
    delay: 50,
    reset: true,
    opacity: 0,
    scale: 1,
    duration: 1000
  };

  $scope.optionsgoZoom = {
    distance: '0px',
    delay: 100,
    scale: 0.1,
    duration: 1000,
    reset: true
  };


  $scope.openJoinWhitelistModal = function() {

      var mdInstance = $uibModal.open({
          templateUrl: 'views/common/modals/join-whitelist-modal.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: 'whitelist',
          windowClass: 'custom-modal',
          resolve: {}
      });

      mdInstance.result
      .then(function() {})
      .catch(function(res) {
          if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
              throw res;
          }
      });

  };
};


ModalInstanceCtrl.$inject = ['$scope','$uibModalInstance'];
function ModalInstanceCtrl($scope,$uibModalInstance) {

    var vm = this;

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };


}
