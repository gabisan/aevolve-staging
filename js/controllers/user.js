//main.js
angular
.module('app')
.controller('kycCtrl', kycCtrl)

kycCtrl.$inject = ['$scope', '$rootScope', '$http', '$window', '$state', '$uibModal', '$timeout', 'UserService', 'aevolve'];

function kycCtrl($scope, $rootScope, $http, $window, $state, $uibModal, $timeout, UserService, aevolve) {

	var vm = this;

	vm.user = JSON.parse(localStorage.getItem('user'));

	console.log(vm.user);

	// vm.levelOne = function() {

	// };

	// vm.levelTwo = function() {

	// };

	// vm.levelThree = function() {

	// };
}