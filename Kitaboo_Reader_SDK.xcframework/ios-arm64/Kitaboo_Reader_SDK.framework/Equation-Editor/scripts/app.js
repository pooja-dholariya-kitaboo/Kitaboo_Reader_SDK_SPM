angular.module('virtual-keyboard', ['ui.router', 'mobileKeyboard-holder']).controller('EquationMainController', function EquationMainController($scope, $state) {
    $scope.hideKeyBoard = (sessionStorage.getItem('hideKeyBoard') == 1 || sessionStorage.getItem('hideKeyBoard') == "1") ? true : false;
    //$scope.hideKeyBoard = true;
	window.top.hidekeyboard = function(data) {
            console.log("hidekeyboard called")
            $scope.hideKeyBoard = data;
        }
    var answerSpan = document.getElementById('math-equation-holder');
    var MQ = MathQuill.getInterface(2); // keeps the API stable
    
    $scope.answerMathField = MQ.MathField(answerSpan, {
    spaceBehavesLikeTab: false,
    supSubsRequireOperand: true,
    substituteTextarea: function () {
        return document.createElement('textarea');
    },
    handlers: {
    enter: function () {
        $scope.answerMathField.write('\\textcolor{}{\\text{ }}');
    }
    }
    });
    
    window.enterPress = function () {
        $scope.answerMathField.write('\\textcolor{}{\\text{ }}');
        $('.mq-root-block').focus();
        $scope.answerMathField.focus();
    };
    
    //    window.top.dataCallback = function (data) {
    //        if (data) {
    //            var obj = data.activityVO;
    //            var decodedLatex = JSON.parse(decodeURIComponent(obj.metadata));
    //            $scope.LinkID = decodedLatex.LinkID;
    //            if (decodedLatex.editorData && decodedLatex.editorData.latex) {
    //                $scope.answerMathField.latex(decodedLatex.editorData.latex);
    //            }
    //
    //            if (obj.submitted) {
    //                // $scope.$evalAsync(function ($scope) {
    //                //     $scope.hideKeyBoard = true;
    //                // });
    //
    //                $('.equation-holder').addClass('disabledEqn');
    //                $(".cancelBtn").css("left", "40%");
    //            } else {
    //                // $scope.$evalAsync(function ($scope) {
    //                //     $scope.hideKeyBoard = false;
    //                //     $scope.answerMathField.focus();
    //                // });
    //                $scope.answerMathField.focus();
    //            }
    //        } else {
    //            // $scope.$evalAsync(function ($scope) {
    //            //     $scope.hideKeyBoard = false;
    //            //     $scope.answerMathField.focus();
    //            // });
    //            $scope.answerMathField.focus();
    //        }
    //    };
    
    
    
    
    
    
    var incorrectAnswerSpan = document.getElementById('incorrect-ans-holder');
    var correctAnswerSpan = document.getElementById('correct-ans-holder');
    var MQ = MathQuill.getInterface(2); // keeps the API stable
    $('#correctAnsView').hide();
    //$('#answer-main-container').css({'width':'50%','left':'50%'});
    //$('.incorrectfd').css({'width':'100%'});;
    //$('.gotItBtn').css({'margin-right': '15px','margin-bottom': '7px'});
    
    $scope.incorrectAnswerMathField = MQ.MathField(incorrectAnswerSpan, {
    spaceBehavesLikeTab: false,
    supSubsRequireOperand: true,
    substituteTextarea: function () {
        return document.createElement('label');
    },
    handlers: {
    enter: function () {
        $scope.answerMathField.write('\\textcolor{}{\\text{ }}');
    }
    }

     });
    
    $scope.correctAnswerMathField = MQ.MathField(correctAnswerSpan, {
    spaceBehavesLikeTab: false,
    supSubsRequireOperand: true,
    substituteTextarea: function () {
        return document.createElement('label');
    },
    handlers: {
    enter: function () {
        $scope.correctAnswerMathField.write('\\textcolor{}{\\text{ }}');
    }
    }
        
    });
    
    window.top.hidekeyboard = function(data) {
        console.log("hidekeyboard called")
        $scope.hideKeyBoard = data;
    }
  // $('#correctAnsView').show();
//	 //$('#answer-main-container').css({'width': '80%'});
//                        //$('.incorrectfd').css({'width': '50%','margin-right':'20px'});
//    $scope.correctAnswerMathField.latex('√√√√√√√√√√√√√√√√√√√√√√√nxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmk');
//   	$scope.incorrectAnswerMathField.latex("√√√√√√√√√√√√√√√√√√√√√√√nxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmknxsxnsksnxksnxxmskxmk");
//    if($("#correctAnsView").is(":visible") == false){
//        $('#answer-main-container').css({'width': '60%'});
//        $('.incorrectfd').css({'width': '100%','margin-right':'20px','margin-bottom':'20px'});
//        
//    } 
  
    window.top.dataCallback = function (data,deviceType) {
		console.log("hidekeyboard "+ atob(data))


		var isHideKeyBoard = JSON.parse(atob(data)).hideKeyboard
		console.log("hidekeyboard "+ atob(data))
        if(isHideKeyBoard){
            console.log("hidekeyboard called 1")
            
            if(deviceType == 'online'){
                if (data) {
                    if(data.answer){
                      //  $('#answer-main-container').css({'width': '80%'});
                        //$('.incorrectfd').css({'width': '50%','margin-right':'20px'});
                        $('#correctAnsView').show();
                        
                        $scope.correctAnswerMathField.latex(data.answer);
                    }else{
                        $('.incorrect-ans-containerPara').text('This is Correct answer');
                    }
                    
                    
                    var decodedLatex = JSON.parse(decodeURIComponent(data.activityVO.metadata));
                    $scope.LinkID = decodedLatex.LinkID;
                    if (decodedLatex.editorData && decodedLatex.editorData.latex) {
                        $scope.incorrectAnswerMathField.latex(decodedLatex.editorData.latex);
                        
                    }
                }
            }else {
                var decodedLatex = JSON.parse(atob(data)).latex,
                positionY = JSON.parse(atob(data)).posY;
                
                $scope.incorrectAnswerMathField.latex(decodedLatex);
                console.log("hidekeyboard "+ atob(data))
                var decodedAnswer = JSON.parse(atob(data)).answer
                if(decodedAnswer){
                    $('#correctAnsView').show();
                   $scope.correctAnswerMathField.latex(decodedAnswer);
                }else{
                    var isNotInstantFeedBack = JSON.parse(atob(data)).isNotInstantFeedBack
                    if(isNotInstantFeedBack){
                        $('.incorrect-ans-containerPara').text('');
                    }
                    else{
                    console.log("hidekeyboard")
                    $('.incorrect-ans-containerPara').text('This is Correct answer');
                    }


                }
            }
            
              if($("#correctAnsView").is(":visible") == false){
        $('#answer-main-container').css({'width': '60%'});
        $('.incorrectfd').css({'width': '100%','margin-right':'20px','margin-bottom':'20px'});
        
    } 
            
            
            
            
            
            
            
        } else{
            if (data) {
                        var decodedLatex = JSON.parse(atob(data)).latex;
                $scope.answerMathField.latex(decodedLatex);
                  $scope.answerMathField.focus();
                                } else {
                     
                        $scope.answerMathField.focus();
                    }
                            }
                            
                            
                            
                            
                          
        
                            
                            
                            
                            
                    }
                   
                        
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                

                $state.go('startApp.mobileholder');
            }).config(function ($stateProvider) {
                $stateProvider.state('startApp', {
                    abstract: true,
                    template: '<ui-view/>'
                });
            }).filter('to_trusted', function ($sce) {
                return function (text) {
                    return $sce.trustAsHtml(text);
                };
            });
