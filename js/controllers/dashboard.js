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
  modalInstance.result.then(function() {

  });
  // uibmodalInstance.result.then(function () {
  //     //products = selectedItems;
  // }, function () {
  //     $log.info('Modal dismissed at: ' + new Date());
  // });
};
}

ModalInstanceCtrl.$inject = ['$scope','$uibModalInstance'];
function ModalInstanceCtrl($scope,$uibModalInstance) {

    $scope.close = function() {
      $uibModalInstance.dismiss('cancel');
    };

}
