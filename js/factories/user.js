(function () {
  'use strict';

  angular
      .module('app')
      .factory('UserService', UserService);

      UserService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'aevolve'];
      function UserService($http, $window, $rootScope, $timeout, $location, aevolve) {
      	 var service = {};

       
      	return service;
      }
  })();