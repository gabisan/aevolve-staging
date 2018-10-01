(function () {
  'use strict';

  angular
      .module('app')
      .factory('AuthService', AuthService);

      AuthService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'aevolve'];
      function AuthService($http, $window, $rootScope, $timeout, $location, aevolve) {
      	var service = {};

        service.register = function(data) {
          return $http.post( aevolve.url + '/users', data);
        };

        service.login = function(data) {
          return $http.post( aevolve.url + '/login', data);
        };

        service.verify = function(data) {
           return $http.post( aevolve.url + '/users/verify', data);
        };

        service.logout = function() {
            return $http.get( aevolve.url + '/logout');
        };

        service.whitelist = function (data) {
            return $http.post( aevolve.url + '/subscribe', data);
        };

      	return service;
      }
  })();