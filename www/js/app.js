'use strict';

var coTrainerApp = angular.module('coTrainerApp', ['training', 'sportlerListe', 'ngRoute']);

coTrainerApp.controller('NavController', function ($route) {
    var vm=this;

    vm.isActive = function (route) {
        var active = false;
        if ($route.current) {
            active = $route.current.$$route.originalPath.indexOf(route) >= 0;
        }
        return active
    };
});

coTrainerApp.config(function($routeProvider) {
    $routeProvider.otherwise('/training');
});
