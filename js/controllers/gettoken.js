//main.js
angular
.module('app')
.controller('gettokenCtrl', gettokenCtrl)
.controller('getTokenModalCtrl', getTokenModalCtrl)
.controller('joinWhitelistModalCtrl', joinWhitelistModalCtrl)

gettokenCtrl.$inject = ['$scope','$uibModal', 'UserService', 'KycService'];
function gettokenCtrl($scope,$uibModal, UserService, KycService) {

    var vm = this;

    $scope.whitelist = '';
    // swal(
    //     'Test!',
    //     'Test',
    //     'success'
    // );

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

    /**
     * WhiteList
     */
    vm.getWhiteList = function() {

        UserService.statuswhitelist().then((response) => {

            // console.log(response.data.status);
            if (response)
            {
                $scope.whitelist = response.data.status;
            }
        }).catch(function(res) {

            $scope.whitelist = false;
            throw res;
        });
    };

    // vm.checkKyc = function() {
    //
    //     KycService.getKyc().then((response) => {
    //         console.log(response);
    //     }).catch((response)=> {
    //         throw res;
    //     });
    // }

    vm.getWhiteList();
    // vm.checkKyc();
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
