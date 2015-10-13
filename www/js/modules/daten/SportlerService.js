'use strict';

angular.module('daten').factory('SportlerService', function (localStorageService) {
    var aktiveSportler = [{name: 'Christoph'}, {name: 'Richie'}];

    function starteLauf(sportler) {
        sportler.startZeit = moment();
        speichereSportlerDaten();
    }

    function beendeLauf(sportler) {
        sportler.letzterLauf = moment().diff(sportler.startZeit);
        sportler.startZeit = null;
        speichereSportlerDaten();
    }

    function loescheLauf(sportler) {
        sportler.letzterLauf = null;
        sportler.startZeit = null;
        speichereSportlerDaten();
    }

    function speichereSportlerDaten() {
        localStorageService.set('sportler', aktiveSportler);
    }

    function ladeSportlerDaten() {
        var elementeAusLS = localStorageService.get('sportler');
        if (elementeAusLS) {
            aktiveSportler = elementeAusLS;
        }
    }

    ladeSportlerDaten();

    return {
        get aktiveSportler() {
            return aktiveSportler;
        },
        starteLauf: starteLauf,
        beendeLauf: beendeLauf,
        loescheLauf: loescheLauf,
        speichereSportlerDaten: speichereSportlerDaten
    };
});
