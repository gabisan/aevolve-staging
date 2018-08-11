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
          // animation: false,
          // backdrop: 'static',
          templateUrl: 'views/common/modals/2fa-code-modal.html',
          controller: 'ModalAuthenticatorCtrl',
          windowClass: 'custom-modal',

            // size: '100px',
            resolve: {
            }
      });
      modalInstance.result.then(function() {

      });
      // uibmodalInstance.result.then(function () {
      //     //products = selectedItems;
      // }, function () {
      //     $log.info('Modal dismissed at: ' + new Date());
      // });
    };


    // Open 2Fa Code Authentication modal
    $scope.openAuthentication2 = function() {

      var modalInstance = $uibModal.open({
          // animation: false,
          // backdrop: 'static',
          templateUrl: 'views/common/modals/authenticator-app-modal.html',
          controller: 'ModalAuthenticatorCtrl2',
          windowClass: 'custom-modal',

            // size: '100px',
            resolve: {
            }
      });
      modalInstance.result.then(function() {

      });
      // uibmodalInstance.result.then(function () {
      //     //products = selectedItems;
      // }, function () {
      //     $log.info('Modal dismissed at: ' + new Date());
      // });
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
