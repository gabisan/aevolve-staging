//main.js
angular
.module('app')
.controller('authCtrl', authCtrl)
.controller('authModalCtrl', authModalCtrl)

authCtrl.$inject = ['$scope', '$rootScope', '$http', '$window', '$state', '$uibModal', 'AuthService'];

function authCtrl($scope, $rootScope, $http, $window, $state, $uibModal, AuthService) {

	var vm = this;

	vm.login = function () {

		var data = {
			email : (vm.email) ? vm.email : null,
			password :  (vm.password) ? vm.password : null
		};

		AuthService.login(data).then(function (response) {
      console.log(response);
    });
  }

  vm.register = function () {
  	

  	if (typeof vm.agree == 'undefined' || !vm.agree) {
			var modalInstance = $uibModal.open({
	    
	      templateUrl: 'views/common/modals/auth-modal.html',
	      controller: 'ModalInstanceCtrl',
	      windowClass: 'custom-modal',
	      size: '100px',
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
  	}

  	var data = {
  		firstname : (vm.firstname) ? vm.firstname : null,
  		lastname : (vm.lastname) ? vm.lastname : null,
			email : (vm.email) ? vm.email : null,
			password :  (vm.password) ? vm.password : null,
			newletter : (vm.newletter) ? vm.newletter : null,
		};

		AuthService.register(data).then(function (response) {
      console.log(response);
    });
  }
}

authModalCtrl.$inject = ['$scope','$uibModalInstance'];
function authModalCtrl($scope,$uibModalInstance) {

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };
  
}




