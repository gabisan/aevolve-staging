//main.js
angular
.module('app')
.controller('dashboardCtrl', dashboardCtrl)
.controller('ModalInstanceCtrl', ModalInstanceCtrl)

dashboardCtrl.$inject = ['$scope','$uibModal'];

function dashboardCtrl($scope,$uibModal) {

  // Open Send Token modal
  $scope.openCardModal = function() {

    var modalInstance = $uibModal.open({
      templateUrl: 'views/common/modals/send-token-modal.html',
      controller: 'ModalInstanceCtrl',
      windowClass: 'custom-modal',
      resolve: {}
    });

    /**
     * @form modal result
     * @instance modalInstance
     */
    modalInstance.result
    .then(function() {})
    .catch(function(res) {
      if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
        throw res;
      }
    });
  };

  $scope.openJoinWhitelistModal = function() {

    var mdInstance = $uibModal.open({
      templateUrl: 'views/common/modals/join-whitelist-modal.html',
      controller: 'ModalInstanceCtrl',
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
}

ModalInstanceCtrl.$inject = ['$scope','$uibModalInstance'];
function ModalInstanceCtrl($scope,$uibModalInstance) {

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };
  
}
