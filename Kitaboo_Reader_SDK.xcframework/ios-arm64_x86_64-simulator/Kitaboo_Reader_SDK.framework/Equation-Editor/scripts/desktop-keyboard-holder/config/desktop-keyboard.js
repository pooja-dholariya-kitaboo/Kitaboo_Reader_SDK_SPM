
angular.module('desktopKeyboard-holder',[])
    .config(function($stateProvider,$urlRouterProvider) {
        $stateProvider
            
            .state('startApp.desktopholder', {
                views: {
                    'desktop-holder@': {
                        controller: 'DesktopKeyboardCtrl as desktopkeyboardCtrl',
                        templateUrl: 'scripts/desktop-keyboard-holder/desktop-keyboard.html'
                    }
                }
            });
            // .state('startApp.loginshell.loginsignup', {
            //     url:'/login',
            //     views: {
            //         'loginsignup': {
            //             controller: 'LoginSignupCtrl as loginsignupCtrl',
            //             templateUrl: 'commonshell/contents/login-signup/login-signup.html'
            //         }
            //     }
            // })
            // .state('startApp.loginshell.forgotpwd', {
            //     url:'/forgotpassword',
            //     views: {
            //         'forgotpwd': {
            //             controller: 'ForgotPwdCtrl as forgotpwdCtrl',
            //             templateUrl: 'commonshell/contents/forgot-password/forgotpwd.html'
            //         }
            //     }
            // });
    });
