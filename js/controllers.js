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
    var vm = this;

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

        var uibModalInstance = $uibModal.open({
            templateUrl: 'views/common/modals/join-whitelist-modal.html',
            controller: function ($scope, $uibModalInstance, AuthService) {
                var vm = this;

                $scope.close = function() {
                  $uibModalInstance.close();
                };

                $scope.register = function () {

                  var data = {
                      firstname : vm.firstname,
                      lastname : vm.lastname,
                      email : vm.email
                  };

                  AuthService.whitelist(data).then((response) => {
                      swal(
                          'Thank you for your interest in AEVOLVE!',
                          '<br/><p style="text-align: left; font-weight: normal">We appreciate your signup and will update you as soon as we review and confirm your details. Excited to move on to the next phase.\n <br/> <br/>-The Aevolve Team</p>',
                          'success'
                      ).then(()=> {

                          swal.close();
                      });

                  }).catch((response) => {

                      var mess = response.data.error;
                      swal(
                          'Error!',
                          '<p style="text-transform: capitalize;">' +mess+ '</p>',
                          'error'
                      );
                  });
                }
            },
            controllerAs: 'vm',
            windowClass: 'custom-modal'
        });

        /**
        * resolve close without error
        */
        uibModalInstance.result
        .then(function() {})
        .catch(function(res) {
           if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
              throw res;
           }
        });
    };
}