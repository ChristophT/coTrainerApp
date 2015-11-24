'use strict';

angular.module('daten').factory('SportlerService', function (localStorageService) {
    var sportlerListe;
    var undoInfo = {aktion: null};

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

    function hasAktiveSportler() {
        return this.aktiveSportler && this.aktiveSportler.length > 0;
    }

    function setUndoInfo(aktion, betroffeneSportler) {
        undoInfo.aktion = aktion;
        undoInfo.betroffeneSportler = betroffeneSportler;
    }

    function clearUndoInfo() {
        setUndoInfo(null, null);
    }

    function isUndoAktionVorhanden() {
        return undoInfo.aktion != null;
    }

    function doUndo() {
        if (undoInfo.aktion === 'delete') {
            undoInfo.betroffeneSportler.forEach(function (sportler) {
                sportlerListe.push(sportler);
            })
        }
        clearUndoInfo();
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
        speichereSportlerDaten: speichereSportlerDaten,
        hasAktiveSportler: hasAktiveSportler,
        setUndoInfo: setUndoInfo,
        isUndoAktionVorhanden: isUndoAktionVorhanden,
        doUndo: doUndo,
        clearUndoInfo: clearUndoInfo
    };
});
