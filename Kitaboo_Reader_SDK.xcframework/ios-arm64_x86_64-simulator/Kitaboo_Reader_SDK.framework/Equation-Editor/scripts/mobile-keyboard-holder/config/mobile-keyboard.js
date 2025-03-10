angular.module('mobileKeyboard-holder', []).config(function ($stateProvider) {
    $stateProvider.state('startApp.mobileholder', {
        views: {
            'mobile-holder@': {
                controller: 'MobileKeyboardCtrl as mobilekeyboardCtrl',
                templateUrl: 'scripts/mobile-keyboard-holder/mobile-keyboard.html'
            }
        }
    });
});