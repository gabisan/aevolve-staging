(function () {
  'use strict';

  angular
      .module('app')
      .factory('KycService', KycService);

      KycService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'aevolve'];
      function KycService($http, $window, $rootScope, $timeout, $location, aevolve) {
      	var service = {};

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