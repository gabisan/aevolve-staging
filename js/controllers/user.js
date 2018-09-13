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

	vm.levelOne = function() {

		var data = {
			address: vm.user.address,
			city: vm.user.city,
			postalcode: vm.user.postalcode,
			country: vm.user.country.id,
            birthdate: vm.user.birthdate
		};

		UserService.kyc(data, 'level1').then((response) => {

			console.log(response);

		}).catch((response) => {

			console.log(response);
		});

	};

	/**
	 * get countries
	 */
	vm.getCountries = function() {

		$http.get( aevolve.url + '/countries', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + localStorage.getItem('token')
        }
      }).then((response) => {

      	vm.countries = response.data.countrylist;
      }).catch(function(res){
      		throw res;
      });
	};

	vm.getIdList = function() {

        $http.get( aevolve.url + '/user/kyc/level2/idlist', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        }).then((response) => {

            vm.idlist = response.data.idtypelist;

        }).catch(function(res){
            throw res;
        });
	};

	vm.getCountries();
    vm.getIdList();

	vm.levelTwo = function() {

		console.log($scope.file);

	};

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

	vm.dataImage = function(dataURI) {

        var byteString;

        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    };
}