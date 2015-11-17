'use strict';

var sportlerListe;

sportlerListe = angular.module('sportlerListe', ['ngRoute', 'daten']);

sportlerListe.config(function ($routeProvider) {
    $routeProvider
        .when('/sportler', {
            templateUrl: 'js/modules/sportlerListe/sportlerListe.html',
            controller: 'SportlerListeController as vm'
        });
});

sportlerListe.directive('focusOn',function() {
    return {
        restrict : 'A',
        link : function($scope,$element,$attr) {
            $scope.$watch($attr.focusOn,function(focusVal) {
                if(focusVal === true) {
                    setTimeout(function() {
                        $element.focus();
                    },50);
                }
            });
        }
    }
});