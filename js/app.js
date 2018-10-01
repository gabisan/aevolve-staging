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
  'naif.base64',
	'ngIdle'
])
.config(['cfpLoadingBarProvider', '$httpProvider', 'IdleProvider', 'KeepaliveProvider', function(cfpLoadingBarProvider, $httpProvider, IdleProvider, KeepaliveProvider) {

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
	
	// configure Idle settings
  IdleProvider.idle(300);
  IdleProvider.timeout(60);
  KeepaliveProvider.interval(150);
		
	IdleProvider.interrupt('keydown wheel mousedown touchstart touchmove scroll');
	

}])
.run(['$rootScope', '$state', '$stateParams', '$transitions', '$location', 'Idle', '$uibModal', 'AuthService', function($rootScope, $state, $stateParams, $transitions, $location, Idle, $uibModal, AuthService) {
  var expireModal = null;
	// $transitions.onSuccess({} ,function(){
  //       $rootScope.$stateNow = $state.current.name ;
  // });
  $rootScope.$on('$stateChangeSuccess',function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });

  $transitions.onSuccess({} ,function(){

    var currentUser = JSON.parse(localStorage.getItem('user'));
    var expireTime = new Date (localStorage.getItem('expiry'));
		
    if ($state.includes('wallet') && !Idle.running()) {
      console.log('setting idle watch...');
      Idle.watch();
    }  
    
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
	
  $rootScope.expireDialog = function () {
    if (!expireModal) {
		  expireModal = $uibModal.open({
        templateUrl: 'views/common/modals/keep-login-modal.html',
        controller: 'ModalInstanceCtrl',
        backdrop: true
      });

      //Because finally is a reserved word in JavaScript and reserved keywords are not supported as property names by ES3,
      //you'll need to invoke the method like promise['finally'](callback) to make your code IE8 compatible.
      expireModal.result['finally']( function () {
        expireModal = null;
			});
		}
		return expireModal;
	} 
	
  $rootScope.$on('IdleStart', function() {
    // check (last action in local storage + allowed idle length)  greater than now = not yet idle
    console.log ('user is idle');
    $rootScope.expireDialog();
    
    
  });
  
  $rootScope.$on('IdleTimeout', function() {
		// the user has timed out (meaning idleDuration + timeout has passed without any activity)

    console.log ('user has timedout');
    
    if (expireModal) expireModal.close();
    
    AuthService.logout().then(() => {

            localStorage.clear();

            swal(
                'Logged Out',
                'You have been logged due to inactivity',
                'info'
            );

            $state.go('app.login');
        });
	});
  
  $rootScope.$on('IdleEnd', function() {
  // the user has come back from AFK and is doing stuff update keepalive
    console.log ('user has returned');
  })
  
  $rootScope.$on('Keepalive', function() {
    //set local storage last action to let other open tabs know
    console.log ('keep alive');
    //add check for token expiry to request new jwt token if expired
  });
	
	
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;

}])
.value('duScrollDuration', 2000)
.value('duScrollOffset', 30);