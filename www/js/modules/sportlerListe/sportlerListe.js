'use strict';

var sportlerListe;

sportlerListe = angular.module('sportlerListe', ['ngRoute', 'daten']);

sportlerListe.config(function ($routeProvider) {
    $routeProvider
        .when('/sportler', {
            templateUrl: '/js/modules/sportlerListe/sportlerListe.html',
            controller: 'SportlerListeController as vm'
        });
});