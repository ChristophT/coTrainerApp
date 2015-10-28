'use strict';

angular.module('sportlerListe').controller('SportlerListeController', function (SportlerService) {
    var vm = this;

    vm.sportler = SportlerService.aktiveSportler;

    vm.addSportler = function (name) {
        SportlerService.addSportler(name);
    };

    vm.deleteSportler = function (sportler) {
        SportlerService.deleteSportler(sportler);
    };
});