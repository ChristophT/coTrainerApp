'use strict';

angular.module('sportlerListe').controller('SportlerListeController', function (SportlerService, $location) {
    var vm = this;

    vm.neuerSportler = '';

    vm.sportler = SportlerService.sportler;

    vm.addSportler = function () {
        SportlerService.addSportler(vm.neuerSportler);
        vm.closeAddDialog();
    };

    vm.deleteSportler = function () {
        var zuLoeschendeSportler = [];
        vm.sportler.forEach(function (sportler) {
            if (sportler.selected) {
                zuLoeschendeSportler.push(sportler);
            }
        });
        zuLoeschendeSportler.forEach(function (loeschKandidat) {
            SportlerService.deleteSportler(loeschKandidat);
        });

        SportlerService.setUndoInfo('delete', zuLoeschendeSportler);
    };

    vm.toggleSportlerSelected = function(sportler) {
        SportlerService.clearUndoInfo();

        sportler.selected = !sportler.selected;
    };

    vm.showAddSportler = false;

    vm.openAddDialog = function() {
        SportlerService.clearUndoInfo();

        vm.neuerSportler = '';
        vm.showAddSportler = true;
    };

    vm.closeAddDialog = function() {
        vm.showAddSportler = false;
    };

    vm.preventDefault = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
    };

    vm.showActions = function () {
        return !vm.showAddSportler && vm.sportler && vm.sportler.some(function (sportler) {
            return sportler.selected;
        })
    };

    vm.activateSportler = function () {
        SportlerService.clearUndoInfo();

        vm.sportler.forEach(function (sportler) {
            if (sportler.selected) {
                sportler.selected = false;
                SportlerService.activateSportler(sportler);
            }
        });
        if (SportlerService.hasAktiveSportler()) {
            goToTraining();
        }
    };

    vm.isUndoAktionVorhanden = SportlerService.isUndoAktionVorhanden;

    vm.doUndo = SportlerService.doUndo;

    function goToTraining() {
        $location.path('/training');
    }

    SportlerService.clearUndoInfo();
});