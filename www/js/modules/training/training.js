'use strict';

var training;

training = angular.module('training', ['ngRoute', 'daten']);

training.config(function ($routeProvider) {
    $routeProvider
        .when('/training/', {
            templateUrl: 'js/modules/training/training.html',
            controller: 'TrainingController as vm',
            animation: 'rightToLeft'
        });
    $routeProvider
        .when('/start/', {
            templateUrl: 'js/modules/training/training.html',
            controller: 'TrainingController as vm',
            firstCall: true
        });
});