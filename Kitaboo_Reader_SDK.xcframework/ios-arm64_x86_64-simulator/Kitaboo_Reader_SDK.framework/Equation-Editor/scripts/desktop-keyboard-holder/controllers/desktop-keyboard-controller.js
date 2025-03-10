angular.module('desktopKeyboard-holder').controller('DesktopKeyboardCtrl', function DesktopKeyboardCtrl($state, $filter, $scope, $timeout) { 
	   
       $scope.desktopKeyboardData = desktopKeyboardData;	   
    //    $scope.hideKeyBoard = (sessionStorage.getItem('hideKeyBoard') == 1 || sessionStorage.getItem('hideKeyBoard') == "1") ? true : false;
       sessionStorage.removeItem('hideKeyBoard');
       
    $timeout(function() {
        $('.number').on('touchstart click',$scope.onNumberBtnClick);
        $('.mathPanel').on('touchstart click',$scope.onMathBtnClick);
        $('.relativeDiv').on('touchstart click',$scope.onArrowClick);
        $('.chooseDiv').on('touchstart click',$scope.onChooseClick);
        $('.overlay-modal').on('touchstart click',$scope.onOverlayClick)

        $('.equation-holder').on('touchstart click',$scope.onMathquillTap);
        $('.keys').on('touchstart click',$scope.onKeyTap);

        var containmentBottom = $('body').height() - $(".mobile-keyboard").height() - $('.equation-holder').height();

        // $('#bar').draggable({axis: 'y', containment : [0,0,0,containmentBottom] });


        var answerMathField = $('#math-equation-holder', '.haseqnEditor');
        answerMathField.focus();

        $('.equation-holder').draggable({ 
            handle: ".drag-this",
            scroll : false,
            containment : [0,0,$('body').width() - $('.equation-holder').width(),containmentBottom]
        });

        $('.done-btn').on('touchstart click',$scope.onDoneBtnClick);

        $('.txt-abc').on('touchstart click',$scope.onAbcBtnClick);

        $(window).on('resize', function(event) {
            $('.math-holder').css('margin-top', '0px');

            var containmentBottom = $('body').height() - $(".mobile-keyboard").height() - $('.equation-holder').height();

            $('.equation-holder').draggable({ 
                handle: ".drag-this",
                scroll : false,
                containment : [0,0,$('body').width() - $('.equation-holder').width(),containmentBottom]
            });
            $('.equation-holder').css({'top':'0px','left':'0px'});
        });
    });

    $scope.onNumberBtnClick = function() {
        $('.math').hide();
        $('.numberPanel').show();
    };

    $scope.onMathBtnClick = function() {
        $('.math').show();
        $('.numberPanel').hide();
    };

    $scope.onArrowClick = function() {
        if($('.overlay-modal').css('display') == 'none') {
            if($('.numberPanel').css('display') == 'none') {
                $('.navPanel').css('left','58.5%');
            }
            else
            {
                $('.navPanel').css('left','60.5%');
            }
            // $('.overlay-modal').show();
            // $('.navPanel').show();
            // $('.relativeDiv').css('position','relative');
        }
        else
        {
            $('.overlay-modal').hide();
            $('.navPanel').hide();
            $('.relativeDiv').css('position','static');
        }
    };

    $scope.onChooseClick = function() {
        if($('.overlay-modal').css('display') == 'none') {
            $('.overlay-modal').show();
            $('.choosePanel').show();
            $('.choosePanel3').hide();
            $('.chooseDiv').css('position','relative');
        }
        else
        {
            $('.overlay-modal').hide();
            $('.choosePanel').hide();
            $('.chooseDiv').css('position','static');
        }
    };

    $scope.onOverlayClick = function() {
        $('.overlay-modal').hide();
        $('.choosePanel').hide();
        $('.chooseDiv').css('position','static');
        $('.navPanel').hide();
        $('.relativeDiv').css('position','static');
    };

    $scope.onMathquillTap = function(event) {
        $scope.answerMathField.focus();
    };

    $scope.onKeyTap = function(event) {    	
        event.preventDefault();
        var arrDataLatex = $(event.currentTarget).attr('data-latex-val').split('-'),
            split1 = arrDataLatex[0],
            split2 = arrDataLatex[1],
            split3 = arrDataLatex[2],
            latex = desktopKeyboardData[split1][split2][Number(split3)-1].latex
            // spec = mobileKeyboardData[split1][split2][Number(split3)-1].spec,
            // keyCodeData = mobileKeyboardData[split1][split2][Number(split3)-1].keyCodes;

        if(latex !== undefined) {
            $.each(latex , function(index,obj){
                if(obj.indexOf('key') >= 0)
                {
                    $scope.answerMathField.keystroke(obj.slice(obj.indexOf('-') + 1,obj.length));
                }
                else
                {
                    $scope.answerMathField.typedText(obj);
                }
            });
            $scope.answerMathField.focus();
        }


    };

    $scope.onDoneBtnClick = function(event) {
        //try{
        var textdata = $('.mq-root-block').text();
        var metaString = {
            'latex' : $scope.answerMathField.latex(),
            'height' : $(answerSpan).height(),
            'width' : $(answerSpan).width(),
            'fontSize' : $(answerSpan).css('font-size')
        };
        
        //$scope.saveEqn(textdata);
        var encodedString = encodeURIComponent(JSON.stringify(metaString));
       // activityData.ugcData = textdata;
        
        $scope.nativeCallback(encodedString,textdata);
        $scope.nativeCallback = function(encodedString,textdata) {      
        var userAgent = window.navigator.userAgent;

        // if(userAgent.indexOf('Android') !== -1)
        // {
        //   window.android.getEquationData(encodedString);
        // }
        // else if((userAgent.indexOf('iPad')!==-1 || userAgent.indexOf('iPhone')!==-1))
        // {
        //   window.location ="getEquationData:"+encodedString;
        // }
             
            window.top.getEquationData(encodedString,textdata);
          // if(window.external.notify)
          // {
            window.external.notify(encodedString);
          // }
    
    };
        
       // }
        // catch(err) {
        //     console.dir(err);
        // }
               
    };

    // $scope.saveEqn = function(textdata) {
    //     var obj = {};
    //     obj.data = textdata;
    //     obj.created = $filter('date')(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss');

    //     if (StateService.panelOpen == 'reviewPanel' && StateService.reviewStart) {
    //         // Connection.saveTeacherAnnotations(obj, fttId ? (value ?'update' : 'delete') : 'new');
    //     } else { debugger
    //         //Connection.addFFT(obj, data ? 'textdata' : 'new');
    //     }
    // };

    $scope.onAbcBtnClick = function(event) {
        var metaString = {
            'changeKeyboard' : true,
            'latex' : $scope.answerMathField.latex()
        };

        var encodedString = encodeURIComponent(JSON.stringify(metaString));
        $scope.nativeCallback(encodedString,'nothing');   
    }

    $scope.nativeCallback = function(encodedString,textdata) {    	
        var userAgent = window.navigator.userAgent;

        // if(userAgent.indexOf('Android') !== -1)
        // {
        //   window.android.getEquationData(encodedString);
        // }
        // else if((userAgent.indexOf('iPad')!==-1 || userAgent.indexOf('iPhone')!==-1))
        // {
        //   window.location ="getEquationData:"+encodedString;
        // }
         {        	
            window.top.getEquationData(encodedString,textdata);
          // if(window.external.notify)
          // {
            window.external.notify(encodedString);
          // }
        }
    };

});
