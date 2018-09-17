//main.js
angular
.module('app')
.controller('kycCtrl', kycCtrl)

kycCtrl.$inject = ['$scope', '$rootScope', '$http', '$window', '$state', '$uibModal', '$timeout', '$q', '$exceptionHandler', 'UserService', 'KycService', 'aevolve'];

function kycCtrl($scope, $rootScope, $http, $window, $state, $uibModal, $timeout, $q, $exceptionHandler, UserService, KycService, aevolve) {

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

            swal(
                'Success!',
                'Successfully submitted identification, please wait for verification.',
                'success'
            );

            $timeout( function() {
                $state.go($state.current, {}, {reload: true});
            }, 3000 );

		}).catch((response) => {

            var mess = response.data.error;

            swal(
                'Error!',
                '<p style="text-transform: capitalize;">' +mess+ '</p>',
                'error'
            );

		});

	};

	/**
	 * get countries
	 * @return Countries
	 */
	vm.getCountries = function() {

		KycService.countries().then((response) => {

			vm.countries = response.data.countrylist;

		}).catch(function(res) {
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

		}).catch(function(res) {
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

            swal(
                'Success!',
                'Successfully submitted identification, please wait for verification.',
                'success'
            );

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

            swal(
                'Success!',
                'Successfully submitted identification, please wait for verification.',
                'success'
            );

		}).catch((response) => {

			console.log(response);
		});
	};

	vm.getKyc1 = function() {

		KycService.getKycLevel1().then((response) => {

			$scope.kyc1 	= response.data;

            vm.user.address = $scope.kyc1.address;
            vm.user.city    = $scope.kyc1.city;
			vm.user.country = $scope.kyc1.country_id;
            vm.user.postalcode = $scope.kyc1.postalcode;
            vm.user.birthdate  = $scope.kyc1.birthdate;

		}).catch((response) => {

            $scope.kyc1 = null;
		});
	};

    vm.getKyc2 = function() {

        KycService.getKycLevel2().then((response) => {

            $scope.kyc2 = response.data;
            vm.user.idtype = $scope.kyc2.idtype;

        }).catch((response) => {

            $scope.kyc2 = null;
        });
    };

    vm.getKyc3 = function() {

        KycService.getKycLevel3().then((response) => {

            $scope.kyc3 = response.data;

        }).catch((response) => {

            $scope.kyc3 = null;
        });
    };

	vm.getCountries();
  	vm.getIdList();

  	vm.getKyc1();
  	vm.getKyc2();
  	vm.getKyc3();
}