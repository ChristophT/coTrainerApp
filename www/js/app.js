'use strict';

var coTrainerApp = angular.module('coTrainerApp', ['training', 'sportlerListe', 'ngRoute', 'ngAnimate']);

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

coTrainerApp.directive('preventDefault', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
        }
    };
});