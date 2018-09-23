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

    	swal(
            'Success!',
            '<p style="text-transform: capitalize;">Email verified!</p>',
            'success'
        );

		  $state.go('app.login');
			
		}).catch((response) => {

			$state.go('app.login');
			var mess = response.data.error;
    	swal(
            'Error!',
            '<p style="text-transform: capitalize;">' +mess+ '</p>',
            'error'
        );
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
				localStorage.setItem("expiry", response.data.expiredt);
				
				UserService.me().then((res) => {
					angular.forEach(res, function(value, key)
					{
						if (key === 'data')
						{
							localStorage.setItem("user", JSON.stringify(value.user));
						}
					});

                    $state.go('wallet.main');
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

			swal(
				'Oops...',
				'Please Agree to terms and conditions',
				'info'
			);

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
			swal(
				'Success!',
				'Please check your email for verification.',
				'success'
			);

			$state.go('app.login');

		}).catch((response) => {

			var mess = response.data.error;
			swal(
				'Error!',
				'<p style="text-transform: capitalize;">' +mess+ '</p>',
				'error'
			);
		});
	};

	vm.logout = function () {
        AuthService.logout().then(() => {

            $window.localStorage.clear();

            swal(
                'Logout',
                'Successfully Logged out',
                'info'
            );

            $state.go('app.login');
        });
    }
}

authModalCtrl.$inject = ['$scope', '$uibModalInstance'];
function authModalCtrl($scope, $uibModalInstance) {

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };
}




