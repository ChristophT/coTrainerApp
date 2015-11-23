'use strict';

var direktivenModul = angular.module('direktiven', []);

direktivenModul.directive('preventDefault', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
        }
    };
});

direktivenModul.provider('viewAnimationService', function () {
    var currentAnimation, defaultAnimationClassName ='leftToRight';
    currentAnimation = {className: ''};

    function setViewAnimation(nextRoute) {
        if (nextRoute.animation) {
            currentAnimation.className = nextRoute.animation;
        } else {
            currentAnimation.className = defaultAnimationClassName;
        }
    }

    this.$get = function ($rootScope) {
        $rootScope.$on('$routeChangeStart', function(scope, next) {
            setViewAnimation(next );
        });

        return {
            currentViewAnimation: currentAnimation
        }
    }
});

direktivenModul.directive('viewAnimatorContainer', function (viewAnimationService) {
    return {
        restrict: 'A',
        transclude: true,
        template: '<div class="view-animate-container" ng-class="viewAnimation.className" ng-transclude></div>',
        link: function (scope) {
            scope.viewAnimation = viewAnimationService.currentViewAnimation;
        }
    };
});

direktivenModul.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});