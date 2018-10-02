//main.js
angular
.module('app')
.controller('settingsCtrl', settingsCtrl)
.controller('ModalAuthenticatorCtrl', ModalAuthenticatorCtrl)
.controller('ModalAuthenticatorCtrl2', ModalAuthenticatorCtrl2)

settingsCtrl.$inject = ['$scope','$uibModal'];

function settingsCtrl($scope,$uibModal) {

    // Open 2Fa Code Authentication modal
  $scope.openAuthentication = function() {

    var modalInstance = $uibModal.open({
      templateUrl: 'views/common/modals/2fa-code-modal.html',
      controller: 'ModalAuthenticatorCtrl',
      windowClass: 'custom-modal',
      resolve: {}
    });

    modalInstance.result
    .then(function() {})
    .catch(function(res) {
      if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
        throw res;
      }
    });

  };


    // Open 2Fa Code Authentication modal
  $scope.openAuthentication2 = function() {

    var modalInstance = $uibModal.open({
      templateUrl: 'views/common/modals/authenticator-app-modal.html',
      controller: 'ModalAuthenticatorCtrl2',
      windowClass: 'custom-modal',
      resolve: {
      }
    });
    
    modalInstance.result
    .then(function() {})
    .catch(function(res) {
      if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
        throw res;
      }
    });

  };

}

ModalAuthenticatorCtrl.$inject = ['$scope','$uibModalInstance'];
function ModalAuthenticatorCtrl($scope,$uibModalInstance) {

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };

}

ModalAuthenticatorCtrl2.$inject = ['$scope','$uibModalInstance'];
function ModalAuthenticatorCtrl2($scope,$uibModalInstance) {

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };

}
