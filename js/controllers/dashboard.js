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
      // animation: false,
      // backdrop: 'static',
      templateUrl: 'views/common/modals/send-token-modal.html',
      controller: 'ModalInstanceCtrl',
      windowClass: 'custom-modal',
      // size: '100px',
      resolve: {

      }
    });

    /**
     * @form modal result
     * @instance modalInstance
     */
    modalInstance.result.then(function() {});
  };
}

ModalInstanceCtrl.$inject = ['$scope','$uibModalInstance'];
function ModalInstanceCtrl($scope,$uibModalInstance) {

    $scope.close = function() {
      $uibModalInstance.dismiss('cancel');
    };
}
