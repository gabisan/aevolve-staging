angular
.module('app')
.controller('authCtrl', authCtrl)
.controller('authModalCtrl', authModalCtrl)

authCtrl.$inject = ['$scope', '$rootScope', '$http', '$window', '$state', '$uibModal', '$timeout', 'AuthService', 'UserService', 'aevolve'];

function authCtrl($scope, $rootScope, $http, $window, $state, $uibModal, $timeout, AuthService, UserService, aevolve) {
	var vm = this;

	if ($state.params.code)
	{
		AuthService.verify({code: $state.params.code}).then(function(response) {

		  $scope.isVerified = true;
			$state.go('app.login');
			
		}).catch((response) => {

				$state.go('app.login');
				$scope.unverifiedEmail = true;
				$scope.errorMesssage   = response.error;
		});
	}

	/**
	 * @function Login
	 */
	vm.login = function () {

		var data = {
			email : (vm.email) ? vm.email : null,
			password :  (vm.password) ? vm.password : null
		};

		AuthService.login(data).then((response) => {

			/**
			 * @desc successfull login
			 */
			if (response.data.token)
			{
				localStorage.setItem("token", response.data.token);

				UserService.me().then((res) => {
					angular.forEach(res, function(value, key) 
					{
						if (key === 'data')
						{
							console.log(value.user);
							localStorage.setItem("user", JSON.stringify(value.user));
							$state.go('wallet.main');
						}
					});
				});
			}

    }).catch((response) => {
		/**
		 * @desc unverified email
		 */
		if (response.status === 412)
		{

			$scope.unverifiedEmail = true;
			swal(
				'Oops...',
				'Error please verify your email.',
				'info'
			);
		}
		else {
			$scope.errorLogin = true;
			swal(
				'Oops...',
				'Wrong Email Address or Password.',
				'error'
			);
		}
	});
  };

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
	    .then(() => {})
	    .catch((res) => {
			  if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
			    throw res;
			  }
			});

			return false;
  	}

  	var data = {
			firstname : (vm.firstname) ? vm.firstname : null,
			lastname : (vm.lastname) ? vm.lastname : null,
			email : (vm.email) ? vm.email : null,
			password :  (vm.password) ? vm.password : null,
			newletter : (vm.newletter) ? vm.newletter : null,
		};

		AuthService.register(data).then((response) => {
  		
  		var modalInstance = $uibModal.open({
	    
	      templateUrl: 'views/common/modals/success-modal.html',
	      controller: 'ModalInstanceCtrl',
	      windowClass: 'custom-modal',
	      size: '100px',
	      resolve: {}
	    }).catch((res) => {
			  if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
			    throw res;
			  }
			});

  		modalInstance.result.then(() => {}, () => {
            swal(
                'Success!',
                'Please check your email for verification.',
                'success'
            );
  			$state.go('app.login');
  		});
			
    }).catch((response) => {
    	console.log(response);

    	$scope.errorRegistration = true;
    	vm.getMesssage(response);
    });
  };

  vm.getMesssage = (obj) => {

		angular.forEach(obj, function(value, key) {
			if (key == 'data')
			{
				$scope.message = value.error;
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




