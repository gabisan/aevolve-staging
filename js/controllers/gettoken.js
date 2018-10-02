//main.js
angular
.module('app')
.controller('gettokenCtrl', gettokenCtrl)
.controller('getTokenModalCtrl', getTokenModalCtrl)
.controller('joinWhitelistModalCtrl', joinWhitelistModalCtrl)

gettokenCtrl.$inject = ['$scope','$uibModal', 'UserService'];
function gettokenCtrl($scope,$uibModal, UserService) {

  // Open card modal
  $scope.openGetTokenModal = function() {

    var modalInstance = $uibModal.open({
      templateUrl: 'views/common/modals/get-token-modal.html',
      controller: 'getTokenModalCtrl',
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

  $scope.openJoinWhiteList = function () {

      UserService.whitelist()
          .then((response)=> {

            if (response)
            {
                swal(
                    'Success!',
                    'Successfully whitelisted.',
                    'success'
                );
            }

          })
          .catch((response)=> {
          var mess = response.data.error;
          swal(
              'Error!',
              '<p style="text-transform: capitalize;">' +mess+ '</p>',
              'error'
          );
      });
  }
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
