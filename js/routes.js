angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/dashboard');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    //page title goes her
  })
  .state('app.main', {
    url: '/dashboard',
    templateUrl: 'views/main.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Home',
    },
    //page subtitle goes here
  })

  //components
  .state('app.components.settings', {
    url: '/settings',
    templateUrl: 'views/components/settings.html',
    ncyBreadcrumb: {
      label: 'Settings'
    }
  })
  .state('app.components.referral', {
    url: '/referral',
    templateUrl: 'views/components/referral.html',
    ncyBreadcrumb: {
      label: 'Referral'
    }
  })
  .state('app.components.kyc', {
    url: '/kyc',
    templateUrl: 'views/components/kyc.html',
    ncyBreadcrumb: {
      label: 'KYC'
    }
  })
  .state('app.components.transaction', {
    url: '/transaction',
    templateUrl: 'views/components/transaction.html',
    ncyBreadcrumb: {
      label: 'Transaction History'
    }
  })
  .state('app.components.gettokens', {
    url: '/gettokens',
    templateUrl: 'views/components/gettokens.html',
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
}]);
