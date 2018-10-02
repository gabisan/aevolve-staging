angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');
// http://localhost/aevolve/#!/wallet/settings
  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: false
  });

  // $breadcrumbProvider.setOptions({
  //   prefixStateName: 'app.main',
  //   includeAbstract: true,
  //   template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  // });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
  })

  .state('app.main', {
    url: '/',
    templateUrl: 'views/main.html',
  })

  .state('app.resources', {
   // url: '/resources',
   templateUrl: 'views/pages/resources.html',
  })

  .state('app.resources.faq', {
    url: '/resources',
    templateUrl: 'views/components/faq.html',
  })

  .state('app.resources.media', {
    url: '/resources/media',
    templateUrl: 'views/components/media.html',
  })

  .state('app.resources.developments', {
    url: '/resources/developments',
    templateUrl: 'views/components/developments.html',
  })

  .state('app.resources.concepts', {
    url: '/resources/concepts',
    templateUrl: 'views/components/concepts.html',
  })

  .state('app.login', {
    url: '/login',
    templateUrl: 'views/pages/login.html',
    controller: 'authCtrl',
    controllerAs: 'auth'
  })

  .state('app.register', {
    url: '/register',
    templateUrl: 'views/pages/register.html',
    controller: 'authCtrl',
    controllerAs: 'auth'
  })

  .state('app.verify', {
    url: '/verify/{code}',
    template: ' ',
    controller: 'authCtrl',
  })

  .state('app.forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'views/pages/forgot-password.html',
      controller: 'authCtrl',
      controllerAs: 'auth'
  })

  .state('app.components.gettokens', {
    url: '/gettokens',
    templateUrl: 'views/components/gettokens.html',
  })
  
  .state('wallet', {
    abstract: true,
    templateUrl: 'views/common/layouts/wallet.html',
    resolve: { 
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: [
            'js/controllers/wallet.js',
          ]
        });
      }]
    }
    //page title goes her
  })

  .state('wallet.main', {
    url: '/wallet',
    templateUrl: 'views/wallet/main-wallet.html',
    //page title goes here

    //page subtitle goes here
  })

  //components
  .state('wallet.settings', {
    url: '/wallet/settings',
    templateUrl: 'views/wallet/settings.html',
    ncyBreadcrumb: {
      label: 'Settings'
    }
  })

  .state('wallet.referral', {
    url: '/wallet/referral',
    templateUrl: 'views/wallet/referral.html',
    ncyBreadcrumb: {
      label: 'Referral'
    }
  })

  .state('wallet.kyc', {
    url: '/wallet/kyc',
    templateUrl: 'views/wallet/kyc.html',
    controller: 'kycCtrl',
    controllerAs: 'kyc',
    ncyBreadcrumb: {
      label: 'KYC'
    }
  })

  .state('wallet.transaction', {
    url: '/wallet/transaction',
    templateUrl: 'views/wallet/transaction.html',
    ncyBreadcrumb: {
      label: 'Transaction History'
    }
  })

  .state('wallet.gettokens', {
    url: '/wallet/gettokens',
    templateUrl: 'views/wallet/gettokens.html',
    ncyBreadcrumb: {
      label: 'Get Tokens'
    }
  })

  // Additional Pages
  .state('appSimple.login', {
    url: '/login',
    templateUrl: 'views/pages/login.html'
  })

  .state('appSimple.register', {
    url: '/register',
    templateUrl: 'views/pages/register.html'
  })

  .state('appSimple.404', {
    url: '/404',
    templateUrl: 'views/pages/404.html'
  })

  .state('appSimple.500', {
    url: '/500',
    templateUrl: 'views/pages/500.html'
  })


    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
}]);
