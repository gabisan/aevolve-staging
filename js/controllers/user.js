//main.js
angular
.module('app')
.controller('kycCtrl', kycCtrl)

kycCtrl.$inject = ['$scope', '$rootScope', '$http', '$window', '$state', '$uibModal', '$timeout', 'UserService', 'aevolve'];

function kycCtrl($scope, $rootScope, $http, $window, $state, $uibModal, $timeout, UserService, aevolve) {

	var vm = this;

	$scope.format = 'yyyy-MM-dd';
  	$scope.date = new Date();

	vm.user = JSON.parse(localStorage.getItem('user'));

	console.log(vm.user);

	vm.levelOne = function() {

		var data = {
			address: vm.user.address,
			city: vm.user.city,
			postalcode: vm.user.postalcode,
			country: vm.user.country,
			birthday: vm.user.birthday
		};

		UserService.kyc(data, 'level1').then(function(response){

			console.log(response);
		}).catch(function(response) {

			console.log(response);
		});

	};

	// vm.levelTwo = function() {

	// };

	// vm.levelThree = function() {

	// };

	// $scope.month = [
	// 	{id: 1, name: 'January'},
	// 	{id: 2, name: 'February'},
	// 	{id: 3, name: 'March'},
	// 	{id: 4, name: 'April'},
	// 	{id: 5, name: 'May'},
	// 	{id: 6, name: 'June'},
	// 	{id: 7, name: 'July'},
	// 	{id: 8, name: 'August'},
	// 	{id: 9, name: 'September'},
	// 	{id: 1, name: 'October'},
	// 	{id: 1, name: 'November'},
	// 	{id: 1, name: 'December'},
	// ];
}