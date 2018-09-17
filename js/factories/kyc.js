(function () {
  'use strict';

  angular
      .module('app')
      .factory('KycService', KycService);

      KycService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', '$q', 'aevolve'];
      function KycService($http, $window, $rootScope, $timeout, $location, $q, aevolve) {
      	var service = {};

      	service.getKyc = function() {

            var deferred = $q.defer();

            let kyc1   = $http.get( aevolve.url + '/user/kyc/level1/status' );
            let kyc2   = $http.get( aevolve.url + '/user/kyc/level2' );
            let kyc3   = $http.get( aevolve.url + '/user/kyc/level3' );

            // Array of Promises
            return $q.all([kyc1, kyc2, kyc3 ]);
        };

        service.getKycLevel1 = function () {
          return $http.get( aevolve.url + '/user/kyc/level1' );
        };

        service.getKycLevel2 = function () {
          return $http.get( aevolve.url + '/user/kyc/level2' );
        };

        service.getKycLevel3 = function () {
          return $http.get( aevolve.url + '/user/kyc/level3' );
        };

        service.countries = function() {
          return $http.get( aevolve.url + '/countries' );
        };

        service.list = function(data, level) {
          return $http.get( aevolve.url + '/user/kyc/level2/idlist' );
        };
       
      	return service;
      }
  })();