'use strict';

var coTrainerApp = angular.module('coTrainerApp', ['training', 'sportlerListe', 'ngRoute', 'ngAnimate', 'direktiven']);

coTrainerApp.controller('NavController', function ($route) {
    var vm=this;

    vm.isActive = function (route) {
        var active = false;
        if ($route.current && $route.current.$$route) {
            active = $route.current.$$route.originalPath.indexOf(route) >= 0;
        }
        return active
    };
});

coTrainerApp.config(function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/start'
    });
});
