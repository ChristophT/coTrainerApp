'use strict';

angular.module('sportlerListe').controller('SportlerListeController', function (SportlerService) {
    var vm = this;

    vm.neuerSportler = '';

    vm.sportler = SportlerService.sportler;

    vm.addSportler = function () {
        SportlerService.addSportler(vm.neuerSportler);
        vm.closeAddDialog();
    };

    vm.deleteSportler = function (sportler) {
        SportlerService.deleteSportler(sportler);
    };

    vm.showAddSportler = false;

    vm.openAddDialog = function() {
        vm.neuerSportler = '';
        vm.showAddSportler = true;
    };

    vm.closeAddDialog = function() {
        vm.showAddSportler = false;
    }
});