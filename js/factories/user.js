(function () {
  'use strict';

  angular
      .module('app')
      .factory('UserService', UserService);

      UserService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'aevolve'];
      function UserService($http, $window, $rootScope, $timeout, $location, aevolve) {
      	var service = {};

        service.me = function() {
          return $http.get( aevolve.url + '/user', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + localStorage.getItem('token')
            }
          });
        };

        service.kyc = function(data, level) {
          return $http.post( aevolve.url + '/user/kyc/' + level, data, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic ' + localStorage.getItem('token')
              }
          });
        };
       
      	return service;
      }
  })();