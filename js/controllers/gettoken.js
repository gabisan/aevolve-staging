//main.js
angular
.module('app')
.controller('gettokenCtrl', gettokenCtrl)
.controller('getTokenModalCtrl', getTokenModalCtrl)
.controller('joinWhitelistModalCtrl', joinWhitelistModalCtrl)

gettokenCtrl.$inject = ['$scope','$uibModal'];
function gettokenCtrl($scope,$uibModal) {
  // Open card modal
    $scope.openGetTokenModal = function() {

      var modalInstance = $uibModal.open({
          // animation: false,
          // backdrop: 'static',
          templateUrl: 'views/common/modals/get-token-modal.html',
          controller: 'getTokenModalCtrl',
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

    $scope.openJoinWhitelistModal = function() {

      var modalInstance = $uibModal.open({
          // animation: false,
          // backdrop: 'static',
          templateUrl: 'views/common/modals/join-whitelist-modal.html',
          controller: 'getTokenModalCtrl',
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

getTokenModalCtrl.$inject = ['$scope','$uibModalInstance'];
function getTokenModalCtrl($scope,$uibModalInstance) {

    $scope.close = function() {
      $uibModalInstance.dismiss('cancel');
    };

}
joinWhitelistModalCtrl.$inject = ['$scope','$uibModalInstance'];
function joinWhitelistModalCtrl($scope,$uibModalInstance) {

    $scope.close = function() {
      $uibModalInstance.dismiss('cancel');
    };

}
