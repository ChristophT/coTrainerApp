'use strict';

var coTrainerApp = angular.module('coTrainerApp', ['training', 'ngRoute']);

coTrainerApp.controller('Zeitnahme', function () {
    var vm=this;

    vm.klappt = "Jawoll";
});

coTrainerApp.config(function($routeProvider) {
    $routeProvider.otherwise('/training');
});
