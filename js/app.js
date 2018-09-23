// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
.module('app', [
  'ui.router',
  'ui.bootstrap',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'ngclipboard',
  '720kb.datepicker',
  'angularMoment',
  'ngAnimate',
  'duScroll',
  'ngScrollReveal',
  'naif.base64'
])
.config(['cfpLoadingBarProvider', '$httpProvider', function(cfpLoadingBarProvider, $httpProvider) {

  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;

  $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
  $httpProvider.defaults.headers.put["Content-Type"]  = "application/json";

  $httpProvider.interceptors.push(['$q', '$location', '$window', '$state', function ($q, $location, $window, $state) {
     return {
         'request': function (config) {
             config.headers = config.headers || {};
             if (localStorage.getItem('token')) {
                 config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
             }
             return config;
         },
         'responseError': function (response) {

             if (response.status === 401) {

                swal(
                  'Oops...',
                  'Unauthorized access.',
                  'error'
                ).then(()=> {
                  $window.localStorage.clear();
                  $state.go('app.login');
                });
             }

             return $q.reject(response);
         }
     };
  }]);

  // if (localStorage.getItem('token'))
  // {
  //   var token = localStorage.getItem('token');
  //
  //   $httpProvider.defaults.headers.post["Authorization"] = "Bearer " + token;
  //   $httpProvider.defaults.headers.put["Authorization"]  = "Bearer " + token;
  // }
  
  // $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
  //   var key, result = [];

  //   if (typeof data === "string")
  //     return data;

  //   for (key in data) {
  //     if (data.hasOwnProperty(key))
  //       result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
  //   }
  //   return result.join("&");
  // });

}])
.run(['$rootScope', '$state', '$stateParams', '$transitions', '$location', function($rootScope, $state, $stateParams, $transitions, $location) {
  // $transitions.onSuccess({} ,function(){
  //       $rootScope.$stateNow = $state.current.name ;
  // });
  $rootScope.$on('$stateChangeSuccess',function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });

  $transitions.onSuccess({} ,function(){

    var currentUser = JSON.parse(localStorage.getItem('user'));
    var expireTime = new Date (localStorage.getItem('expiry'));
		
    if ($state.current.name === 'app.main') {
    
      $rootScope.mainNav = true;
    } else {

      $rootScope.mainNav = false;
    }
		
		
    if (expireTime.getTime() < Date.now()) {
      localStorage.clear();
      currentUser = null;
    }
		
    if (currentUser) {

        $rootScope.authenticated = true;
        $rootScope.currentUser = currentUser;

        if($location.path() == '/login' || $location.path() == '/register') 
            $state.go('app.main');

    } else {

        $rootScope.authenticated = false;

        if($location.path() == '/wallet')
            $state.go('app.login');

    }

  });

  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;

}])
.value('duScrollDuration', 2000)
.value('duScrollOffset', 30);
