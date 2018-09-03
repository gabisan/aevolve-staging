//main.js
angular
.module('app')
.controller('loginCtrl', loginCtrl)

loginCtrl.$inject = ['$scope', '$rootScope', '$http', '$window', '$state', 'AuthService'];

function loginCtrl($scope, $rootScope, $http, $window, $state, AuthService) {

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
}