'use strict';

angular.module('daten').factory('SportlerService', function (localStorageService) {
    var sportlerListe, aktiveSportlerListe = [{name: 'Christoph'}, {name: 'Richie'}];

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

    function addSportler(name) {
        sportlerListe.push({'name': name});
        speichereSportlerDaten();
    }

    function deleteSportler(sportler) {
        sportlerListe.remove(sportler);
        aktiveSportlerListe.remove(sportler);
        speichereSportlerDaten();
    }

    function speichereSportlerDaten() {
        localStorageService.set('aktiveSportler', aktiveSportlerListe);
        localStorageService.set('sportler', sportlerListe);
    }

    function ladeSportlerDaten() {
        var elementeAusLS = localStorageService.get('sportler');
        if (elementeAusLS) {
            sportlerListe = elementeAusLS;
        }
        elementeAusLS = localStorageService.get('aktiveSportler');
        if (elementeAusLS) {
            aktiveSportlerListe = elementeAusLS;
        }
    }

    ladeSportlerDaten();

    return {
        get aktiveSportler() {
            return aktiveSportlerListe;
        },
        get sportler() {
            return sportlerListe;
        },
        addSportler: addSportler,
        deleteSportler: deleteSportler,
        starteLauf: starteLauf,
        beendeLauf: beendeLauf,
        loescheLauf: loescheLauf,
        speichereSportlerDaten: speichereSportlerDaten
    };
});
