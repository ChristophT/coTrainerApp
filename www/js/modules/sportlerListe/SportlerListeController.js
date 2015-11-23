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
        })
    };

    vm.toggleSportlerSelected = function(sportler) {
        sportler.selected = !sportler.selected;
    };

    vm.showAddSportler = false;

    vm.openAddDialog = function() {
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

    function goToTraining() {
        $location.path('/training');
    }

});