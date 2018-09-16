//main.js
angular
.module('app')
.controller('kycCtrl', kycCtrl)

kycCtrl.$inject = ['$scope', '$rootScope', '$http', '$window', '$state', '$uibModal', '$timeout', 'UserService', 'KycService', 'aevolve'];

function kycCtrl($scope, $rootScope, $http, $window, $state, $uibModal, $timeout, UserService, KycService, aevolve) {

	var vm = this;

	$scope.img     = '';
	$scope.format = 'yyyy-MM-dd';
  $scope.date   = new Date();

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
	 * @return Countries
	 */
	vm.getCountries = function() {

		KycService.countries().then((response) => {

    	vm.countries = response.data.countrylist;
    }).catch(function(res){
    		throw res;
    });
	};

	/**
	 * get id type list
	 * @return Id Type list
	 */
	vm.getIdList = function() {

    KycService.list().then((response) => {

      vm.idlist = response.data.idtypelist;

    }).catch(function(res){
        throw res;
    });
	};

	vm.levelTwo = function() {

		var data = {
			idno : vm.user.id,
			idtype: vm.user.idtype.id,
			image : $scope.file.base64
		};
		// 'data:'+$scope.file.filetype+';base64,' + 

		UserService.kyc(data, 'level2').then((response) => {

			console.log(response);

		}).catch((response) => {

			console.log(response);
		});
	};

	vm.levelThree = function() {

		var data = {
			document: $scope.document.base64,
			selfie : $scope.selfie.base64
		};

		UserService.kyc(data, 'level3').then((response) => {

			console.log(response);

		}).catch((response) => {

			console.log(response);
		});
	};

	vm.getImage = function() {


		// http://46.4.167.77:8080/user/kyc/image/bSNbpRmLLRQjqtV0g6IgscGpnGvsaTnQ0BjVJxrP5TP

		$http.get( aevolve.url + '/user/kyc/image/iITh7olRKa5yyTYUf8rMNqFzuU7A2C5lv0LU338N2HM' )
		.then((response)=> {
				vm.img = response.data.image;

				// console.log($scope.img);
		});
	}

	// vm.getKycLevel1 = function() {

	// 	var kyc  = [];

	// 	KycService.getKycLevel1().then((response) => {

 //    }).catch(function(res){
 //        throw res;
 //    });

	// };

	vm.getImage();
	vm.getCountries();
  vm.getIdList();
  // vm.getKycLevel1();
	
}