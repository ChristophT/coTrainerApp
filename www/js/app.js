'use strict';

var coTrainerApp = angular.module('coTrainerApp', ['training', 'sportlerListe', 'ngRoute']);

coTrainerApp.controller('NavController', function ($route) {
    var vm=this;

    vm.isActive = function (route) {
        return $route.current.$$route.originalPath.indexOf(route) >= 0;
    };
});

coTrainerApp.config(function($routeProvider) {
    $routeProvider.otherwise('/training');
});
