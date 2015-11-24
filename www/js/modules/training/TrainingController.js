'use strict';

angular.module('training').controller('TrainingController', function (SportlerService, $location, $route) {
    var vm=this;

    if ($route.current.$$route.firstCall) {
        if (!SportlerService.hasAktiveSportler()) {
            goToSportlerListe();
        } else {
            $location.path('/training');
        }
    }

    function listeAktualisieren() {
        vm.aktiveSportler = SportlerService.aktiveSportler;
    }

    listeAktualisieren();

    vm.hatPause = function (sportler) {
        return !sportler.startZeit && !sportler.letzterLauf;
    };

    vm.unterwegs = function (sportler) {
        return sportler.startZeit && !sportler.letzterLauf;
    };

    vm.imZiel = function (sportler) {
        return !sportler.startZeit && sportler.letzterLauf;
    };

    vm.starteLauf = SportlerService.starteLauf;
    vm.beendeLauf = SportlerService.beendeLauf;
    vm.loescheLauf = SportlerService.loescheLauf;

    vm.laufZeitString = function (sportler) {
        var dauer = moment.duration(sportler.letzterLauf);
        var stundenString = (dauer.hours() > 0 ? dauer.hours() + ':' : '');
        return stundenString +
            fillTimeUnitString(dauer.minutes()) + ':' +
            fillTimeUnitString(dauer.seconds()) + '.' +
            fillTimeUnitString(Math.floor(dauer.milliseconds() / 10));
    };

    function fillTimeUnitString(numValue) {
        return numValue < 10 ? '0' + numValue : numValue;
    }

    function goToSportlerListe() {
        $location.path('/sportler');
    }

    vm.trainingBeenden = function () {
        SportlerService.trainingBeenden();
        listeAktualisieren();
        goToSportlerListe();
    };

    SportlerService.clearUndoInfo();
});