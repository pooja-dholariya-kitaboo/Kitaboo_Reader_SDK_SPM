angular.module('virtual-keyboard', ['ui.router', 'mobileKeyboard-holder']).controller('EquationMainController', function EquationMainController($scope, $state) {
    $scope.hideKeyBoard = (sessionStorage.getItem('hideKeyBoard') == 1 || sessionStorage.getItem('hideKeyBoard') == "1");
    window.top.hidekeyboard = function(data) {
            console.log("hidekeyboard called")
            $scope.hideKeyBoard = data;
        }
    let answerSpan = document.getElementById('math-equation-holder');
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
    
    let incorrectAnswerSpan = document.getElementById('incorrect-ans-holder');
    let correctAnswerSpan = document.getElementById('correct-ans-holder');
    var MQ = MathQuill.getInterface(2); // keeps the API stable
    $('#correctAnsView').hide();
    
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
  
    window.top.dataCallback = function (data,deviceType) {
        console.log("hidekeyboard "+ atob(data))


        let isHideKeyBoard = JSON.parse(atob(data)).hideKeyboard
        console.log("hidekeyboard "+ atob(data))
        if(isHideKeyBoard){
            console.log("hidekeyboard called 1")
            
            if(deviceType == 'online'){
                if (data) {
                    if(data.answer){
                        $('#correctAnsView').show();
                        
                        $scope.correctAnswerMathField.latex(data.answer);
                    }else{
                        $('.incorrect-ans-containerPara').text('This is Correct answer');
                    }
                    
                    
                    let decodedLatex = JSON.parse(decodeURIComponent(data.activityVO.metadata));
                    $scope.LinkID = decodedLatex.LinkID;
                    if (decodedLatex.editorData?.latex) {
                        $scope.incorrectAnswerMathField.latex(decodedLatex.editorData.latex);
                        
                    }
                }
            }else {
                var decodedLatex = JSON.parse(atob(data)).latex,
                positionY = JSON.parse(atob(data)).posY;
                
                $scope.incorrectAnswerMathField.latex(decodedLatex);
                console.log("hidekeyboard "+ atob(data))
                let decodedAnswer = JSON.parse(atob(data)).answer
                if(decodedAnswer){
                    $('#correctAnsView').show();
                   $scope.correctAnswerMathField.latex(decodedAnswer);
                }else{
                    let isNotInstantFeedBack = JSON.parse(atob(data)).isNotInstantFeedBack
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
            
            
            
            
            
            
            
        } else {
            if (data) {
                let decodedLatex = JSON.parse(atob(data)).latex;
                $scope.answerMathField.latex(decodedLatex);
            }
            $scope.answerMathField.focus();
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
