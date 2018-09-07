angular
.module('app')
.controller('authCtrl', authCtrl)
.controller('authModalCtrl', authModalCtrl)

authCtrl.$inject = ['$scope', '$rootScope', '$http', '$window', '$state', '$uibModal', '$timeout', 'AuthService', 'UserService', 'aevolve'];

function authCtrl($scope, $rootScope, $http, $window, $state, $uibModal, $timeout, AuthService, UserService, aevolve) {

	var vm = this;

	if ($state.params.code)
	{
		$scope.isVerified = true;

		AuthService.verify({code: $state.params.code}).then(function(response) {

			if (response.status == 200)
			{
				var verificationModal = $uibModal.open({
		      templateUrl: 'views/common/modals/verification-modal.html',
		      controller: authModalCtrl,
		      controllerAs: 'auth',
		      size: '100px',
		      resolve: { }
		    });

		    verificationModal.result.then(function () {}, function () {
		      $state.go('app.login');
		    });
			}
			
		});

	}

	vm.login = function () {

		var data = {
			email : (vm.email) ? vm.email : null,
			password :  (vm.password) ? vm.password : null
		};

		AuthService.login(data).then(function (response) {

			/**
			 * @desc successfull login
			 */
			if (response.data.token)
			{
				localStorage.setItem("token", response.data.token);

				UserService.me().then(function(res) 
				{
					angular.forEach(res, function(value, key) 
					{
						if (key == 'data')
						{
							console.log(value.user);
							localStorage.setItem("user", JSON.stringify(value.user));
							$state.go('wallet.main');
						}
					});
				});
			}

			/**
			 * @desc unverified email
			 */
			if (response.status == 200)
			{
				$uibModal.open({
		      templateUrl: '',
		      controller: authModalCtrl,
		      controllerAs: 'auth',
		      size: '100px',
		      resolve: {
		      }
		    });
			}
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
     
      if (response.status == 200)
			{
				$state.go('app.login');
			}
    });
  }
}

authModalCtrl.$inject = ['$scope', '$uibModalInstance'];
function authModalCtrl($scope, $uibModalInstance) {

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };
}




