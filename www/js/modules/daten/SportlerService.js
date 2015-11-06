'use strict';

angular.module('daten').factory('SportlerService', function (localStorageService) {
    var sportlerListe;

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

    function trainingBeenden() {
        sportlerListe.forEach(function (sportler) {
            if (sportler.aktiv) {
                beendeLauf(sportler);
                sportler.aktiv = false;
            }
        });
        speichereSportlerDaten();
    }

    function addSportler(name) {
        if (name && name.trim().length > 0) {
            sportlerListe.push({'name': name});
            speichereSportlerDaten();
        }
    }

    function activateSportler(sportler) {
        sportler.aktiv = true;
        speichereSportlerDaten();
    }

    function deleteSportler(sportler) {
        sportlerListe.remove(sportler);
        speichereSportlerDaten();
    }

    function speichereSportlerDaten() {
        localStorageService.set('sportler', sportlerListe);
    }

    function ladeSportlerDaten() {
        var elementeAusLS = localStorageService.get('sportler');
        if (elementeAusLS) {
            sportlerListe = elementeAusLS;
        } else {
            sportlerListe = [];
        }
    }

    ladeSportlerDaten();

    return {
        get aktiveSportler() {
            return sportlerListe.filter(function (sportler) {
                return sportler.aktiv;
            });
        },
        get sportler() {
            return sportlerListe;
        },
        addSportler: addSportler,
        activateSportler: activateSportler,
        deleteSportler: deleteSportler,
        starteLauf: starteLauf,
        beendeLauf: beendeLauf,
        loescheLauf: loescheLauf,
        trainingBeenden: trainingBeenden,
        speichereSportlerDaten: speichereSportlerDaten
    };
});
