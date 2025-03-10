angular.module('mobileKeyboard-holder').controller('MobileKeyboardCtrl', function MobileKeyboardCtrl($scope, $timeout) {
    $scope.mobileKeyboardData = mobileKeyboardData;
    $scope.hideKeyBoard = (sessionStorage.getItem('hideKeyBoard') == 1 || sessionStorage.getItem('hideKeyBoard') == "1") ? true : false;
    sessionStorage.removeItem('hideKeyBoard');
    var timeout = null;

    timeout = $timeout(function () {
        $('.number').on('touchstart click', onNumberBtnClick);
        $('.capitalnumbers').on('touchstart click', oncapitalnumbersClick);
        $('.mathPanel').on('touchstart click', onMathBtnClick);
        $('.relativeDiv').on('touchstart click', onArrowClick);
        $('.alfabetDiv').on('touchstart click', onChooseClick);
        $('.symbolDiv').on('touchstart click', onChooseClick1);
        $('.numberPanelDiv').on('touchstart click', onChooseClick2);
        $('.hideKeyBoardDiv').on('touchstart click', onhideKeyBoardClick);
        $('.chooseDiv3').on('touchstart click', onChooseClick3);
        $('.chooseDiv4').on('touchstart click', onChooseClick4);
        $('.overlay-modal').on('click', onOverlayClick);
        $('.equation-holder').on('touchstart click', onMathquillTap);
        $('.equation-holder').on('keyup', onKeyup);
        $('.keys').on('touchstart click', onKeyTap);
        $('.showkeyboard').on('touchstart click', onshowkeyboardClick);
        $('.addBtn').on('touchstart click', onDoneBtnClick);
        $('.enterclick').on('touchstart click', onenterbuttonclick);
        $('.done-btn').on('touchstart click', onDoneBtnClick);
        $('.txt-abc').on('touchstart click', onAbcBtnClick);
        //$('.abcIcon').on('touchstart click', onAbcBtnClick);
        // $scope.answerMathField.focus();
       

        if ($scope.hideKeyBoard) {
            $( ".mq-textarea" ).remove();
        } else {
            $('.mq-textarea').focus();
            $('.equation-holder').focus();
            $('#math-equation-holder').focus();
        }

        var containmentBottom = $('body').height() - $(".mobile-keyboard").height() - $('#draggable-element').height();

        $('#draggable-element').draggable({
            handle: ".drag-this",
            scroll: false,
            containment: [0, 0, $('body').width() - $('#draggable-element').width(), containmentBottom]
        });

        window.addEventListener("resize", function () {
            var containmentBottom = $('body').height() - $(".mobile-keyboard").height() - $('#draggable-element').height();

            $('#draggable-element').draggable({
                handle: ".drag-this",
                scroll: false,
                containment: [0, 0, $('body').width() - $('#draggable-element').width(), containmentBottom]
            });
        }, false);
    });

    $(window).on("orientationchange", function () {
        $("#draggable-element").css({
            "top": "",
            "left": ""
        });
    });

    window.addEventListener("resize", function () {
        $("#draggable-element").css({
            "top": "",
            "left": ""
        });
    });

    var onenterbuttonclick = function () {
        window.enterPress();
    };

    var onNumberBtnClick = function () {
        $('.math').hide();
        $('.numberPanel').show();
    };

    var oncapitalnumbersClick = function () {
        $('.alfabetDiv').hide();
        $('.choosePanelUpperCase').show();
    };

    var onMathBtnClick = function () {
        $('.math').show();
        $('.numberPanel').hide();
    };

    var onArrowClick = function () {
        if ($('.overlay-modal').css('display') == 'none') {
            if ($('.numberPanel').css('display') == 'none') {
                $('.navPanel').css('left', '16.5%');
            } else {
                $('.navPanel').css('left', '60.5%');
            }
            $('.overlay-modal').show();
            $('.navPanel').show();
            $('.relativeDiv').css('position', 'relative');
        } else {
            $('.overlay-modal').hide();
            $('.navPanel').hide();
            $('.relativeDiv').css('position', 'static');
        }
    };

    var onChooseClick = function () {
        if ($('.overlay-modal').css('display') == 'none') {
            $('.overlay-modal').show();
            $('.choosePanel').show();
            //$('.choosePanel3').show();
            $('.alfabetDiv').css('position', 'relative');
        } else {
            $('.overlay-modal').hide();
            $('.choosePanel').hide();
            $('.choosePanel3').hide();
            $('.alfabetDiv').css('position', 'static');
        }
    };

    var onChooseClick1 = function () {
        if ($('.overlay-modal').css('display') == 'none') {
            $('.overlay-modal').show();
            $('.symbolPanel').show();
            $('.symbolDiv').css('position', 'relative');
        } else {
            $('.overlay-modal').hide();
            $('.symbolPanel').hide();
            $('.symbolDiv').css('position', 'static');
        }
    };

    var onChooseClick2 = function () {
        if ($('.overlay-modal').css('display') == 'none') {
            $('.overlay-modal').show();
            $('.choosePanel2').show();
            $('.numberPanelDiv').css('position', 'relative');
        } else {
            $('.overlay-modal').hide();
            $('.choosePanel2').hide();
            $('.numberPanelDiv').css('position', 'static');
        }
    };

    var onhideKeyBoardClick = function () {
        //$scope.showkeboard = true;
        //$('.mobile-keyboard').hide();
        $('.math').hide();
        $('.showkeyboard').show();
        var containmentBottom = $('body').height() - $('#draggable-element').height();
        $('#draggable-element').draggable({
            handle: ".drag-this",
            scroll: false,
            containment: [0, 0, $('body').width() - $('#draggable-element').width(), containmentBottom]
        });
    };

    var onshowkeyboardClick = function () {
        $('#draggable-element').css("top", "");
        $('#draggable-element').css("left", "");
        
        window.setTimeout(function () {
            $('.math').show();
            $('.showkeyboard').hide();
            var containmentBottom = $('body').height() - $(".mobile-keyboard").height() - $('#draggable-element').height();

            $('#draggable-element').draggable({
                handle: ".drag-this",
                scroll: false,
                containment: [0, 0, $('body').width() - $('#draggable-element').width(), containmentBottom]
            });
        }, 200);
    };

    // $scope.onshowkeboard =function(){
    //     $('.math').show();
    //     $('.showkeboard').hide();
    // };

    var onChooseClick3 = function () {
        $('.overlay-modal').show();
        $('.choosePanel3').show();
        $('.choosePanel').hide();
        $('.chooseDiv3').css('position', 'relative');
    };

    var onChooseClick4 = function () {
        $('.overlay-modal').show();
        $('.choosePanel3').hide();
        $('.choosePanel').show();
        //$('.math').show();
        $('.chooseDiv4').css('position', 'relative');
    };

    var onOverlayClick = function () {
        $('.overlay-modal').hide();
        $('.choosePanel').hide();
        $('.symbolPanel').hide();
        $('.choosePanel2').hide();
        $('.choosePanel3').hide();
        $('.alfabetDiv').css('position', 'static');
        $('.symbolDiv').css('position', 'static');
        $('.numberPanelDiv').css('position', 'static');
        $('.chooseDiv3').css('position', 'static');
        $('.chooseDiv4').css('position', 'static');
        $('.navPanel').hide();
        $('.relativeDiv').css('position', 'static');
    };
    $('.mq-root-block').focus();
    $('.text-area').focus();

    var onMathquillTap = function () {
        $scope.answerMathField.focus();
    };

    var onKeyup = function () {
        if ($('.errormsgtext')[0].style.display == 'block') {
            $('.equation-holder').css("border-color", "#b0b0b0");
            $('.errormsgtext').css("display", "none");
            $('.hidemathkeyboardtext').css("top", "108px");
            document.getElementsByClassName('addBtn').style.pointerEvents = 'block';
        }
    };

    var onKeyTap = function (event) {
        event.preventDefault();
        var arrDataLatex = $(event.currentTarget).attr('data-latex-val').split('-'),
            split1 = arrDataLatex[0],
            split2 = arrDataLatex[1],
            split3 = arrDataLatex[2],
            latex = mobileKeyboardData[split1][split2][Number(split3) - 1].latex;
        // spec = mobileKeyboardData[split1][split2][Number(split3)-1].spec,
        // keyCodeData = mobileKeyboardData[split1][split2][Number(split3)-1].keyCodes;

        if (latex !== undefined) {
            $.each(latex, function (index, obj) {
                if (obj.indexOf('key') >= 0) {
                    $scope.answerMathField.keystroke(obj.slice(obj.indexOf('-') + 1, obj.length));
                } else {
                    $scope.answerMathField.typedText(obj);
                }
            });
            $scope.answerMathField.focus();
        }

        if ($('.errormsgtext')[0].style.display == 'block') {
            $('.equation-holder').css("border-color", "#b0b0b0");
            $('.errormsgtext').css("display", "none");
        }
    };

    var onDoneBtnClick = function () {
        window.setTimeout(function () {
            var textdata = $('.mq-root-block').text();

            if (!textdata) {
                $('.equation-holder').css("border-color", "red");
                $('.errormsgtext').css("display", "block");
                $('.hidemathkeyboardtext').css("top", "122px");

                // document.getElementsByClassName('addBtn').style.pointerEvents = 'none';
            } else {
                var answerSpan = $('.mq-root-block');
                var metaString = {
                    LinkID: $scope.LinkID,
                    editorData: {
                        'latex': $scope.answerMathField.latex(),
                        'height': $(answerSpan).height(),
                        'width': $(answerSpan).width(),
                        'fontSize': $(answerSpan).css('font-size')
                    },
                    submitted: false
                };

                textdata = $scope.answerMathField.latex();
                var encodedString = encodeURIComponent(JSON.stringify(metaString));
//                window.top.getEquationData(encodedString, textdata);
                $scope.nativeCallback(encodedString, textdata);
            }
        }, 200);
    };
  
//    $scope.onDoneBtnClick = function(event) {
//        var metaString = {
//            'latex' : answerMathField.latex(),
//            'height' : $(answerSpan).height(),
//            'width' : $(answerSpan).width(),
//            'fontSize' : $(answerSpan).css('font-size')
//        };
//
//        var encodedString = encodeURIComponent(JSON.stringify(metaString));
//        $scope.nativeCallback(encodedString);
//    };


   
    var onAbcBtnClick = function () {
        var metaString = {
            'changeKeyboard': true,
            'latex': $scope.answerMathField.latex()
        };
        var encodedString = encodeURIComponent(JSON.stringify(metaString));
        $scope.nativeCallback(encodedString, 'nothing');
    };

//    $scope.nativeCallback = function (encodedString, answerMathField, data) {
//        // var userAgent = window.navigator.userAgent;
//        // this will set equation data inside equationEditor.js
//        window.top.getEquationData(encodedString, answerMathField);
//        // window.external.notify(encodedString);
//    };
    $scope.nativeCallback = function(encodedString,textdata) {
        var userAgent = window.navigator.userAgent;

        if(userAgent.indexOf('Android') !== -1)
        {
          window.android.getEquationData(encodedString);
        }
        else if((userAgent.indexOf('iPad')!==-1 || userAgent.indexOf('iPhone')!==-1 | ((navigator.platform === 'MacIntel') && (navigator.maxTouchPoints > 1))))
        {
          window.location ="getEquationData:"+encodedString;
        }
        else {
          // if(window.external.notify)
          // {
//            window.top.getEquationData(encodedString, answerMathField);
            window.top.getEquationData(encodedString, textdata);
          // }
        }
    };
    $scope.$on('$destroy', function () {
        $timeout.cancel(timeout);
        timeout = null;

        $('.number').off('touchstart click', onNumberBtnClick);
        $('.capitalnumbers').off('touchstart click', oncapitalnumbersClick);
        $('.mathPanel').off('touchstart click', onMathBtnClick);
        $('.relativeDiv').off('touchstart click', onArrowClick);
        $('.alfabetDiv').off('touchstart click', onChooseClick);
        $('.symbolDiv').off('touchstart click', onChooseClick1);
        $('.numberPanelDiv').off('touchstart click', onChooseClick2);
        $('.hideKeyBoardDiv').off('touchstart click', onhideKeyBoardClick);
        $('.chooseDiv3').off('touchstart click', onChooseClick3);
        $('.chooseDiv4').off('touchstart click', onChooseClick4);
        $('.overlay-modal').off('click', onOverlayClick);
        $('.equation-holder').off('touchstart click', onMathquillTap);
        $('.equation-holder').off('keyup', onKeyup);
        $('.keys').off('touchstart click', onKeyTap);
        $('.showkeyboard').off('touchstart click', onshowkeyboardClick);
        $('.addBtn').off('touchstart click', onDoneBtnClick);
        $('.enterclick').off('touchstart click', onenterbuttonclick);
        $('.done-btn').off('touchstart click', onDoneBtnClick);
        $('.txt-abc').off('touchstart click', onAbcBtnClick);
        $(window).off("orientationchange");
        window.removeEventListener("resize");
    });
});
