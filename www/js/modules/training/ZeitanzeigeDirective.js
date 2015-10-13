'use strict';

angular.module('training').directive('zeitAnzeige', ['$interval',
    function($interval) {
        function link(scope, element, attrs) {
            var anzeigeIntervall;

            function berechneLaufZeit(sportler) {
                if (!sportler || sportler.startZeit == null) {
                    return 0;
                }
                return moment().diff(sportler.startZeit);
            }

            function updateAnzeige() {
                var sportler = JSON.parse(attrs.sportler);
                var dauer = moment.duration(berechneLaufZeit(sportler));
                var stundenString = (dauer.hours() > 0 ? dauer.hours() + ':' : '');
                element.text(stundenString + fillTimeUnitString(dauer.minutes()) + ':' + fillTimeUnitString(dauer.seconds()));
            }

            function fillTimeUnitString(numValue) {
                return numValue < 10 ? '0' + numValue : numValue;
            }

            anzeigeIntervall = $interval(updateAnzeige, 200);

            element.on('$destroy', function() {
                $interval.cancel(anzeigeIntervall);
            });

            updateAnzeige();
        }

        return {
            restrict: 'E',
            link: link
        };
    }]);