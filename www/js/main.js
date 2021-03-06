(function () {
    'use strict';
    var module = angular.module('app', ['onsen']);
    var networkErrorString = "Tôi không thể tìm thấy kết nối internet, bạn hãy kiểm tra lại được không?";
    var preFrqQuestions = {};
    var randomQuestions = {};
    $(document).ready(function () {
        // call ajax to get list frequently question

        $.ajax({
            type: "GET",
            dataType: "text",
            url: HOST + "/info/frequent",
            success: function (result) {
                preFrqQuestions.items = JSON.parse(result);
            },
            error: function(){
               ons.createAlertDialog('alert.html').then(function(alertDialog) {
                   rubyDialog.dialog = alertDialog;
                   alertDialog.show();
                });
            },
            timeout : TIME_OUT
        });

        $.ajax({
            type: "GET",
            dataType: "text",
            url: HOST + "/info/random",
            success: function (result) {
                randomQuestions.items = JSON.parse(result);
            },
            timeout : TIME_OUT
        });
    });


    module.controller('MainCtrl', function ($scope) {

        ons.createDialog('dialog.html').then(function (dialog) {
            $scope.dialog = dialog;
        });

        ons.createDialog('seemore.html').then(function (dialog) {
            $scope.dialog_seemore = dialog;
        });


        $scope.showRandom = function () {
            $('.dialog-mask').show();
            $scope.dialog.show();
            $('.random-question').show();
            var items = randomQuestions.items;
            $('#random-question-1').html(items[getRandomInt(0,9)]);
            $('#random-question-2').html(items[getRandomInt(10,19)]);
            $('#random-question-3').html(items[getRandomInt(20,29)]);
            for (var i=1;i<=3;i++){
                $('#random-question-' + i).css('line-height','36px');
                var h = $('#random-question-'+i).height();
                if (h > 36) $('#random-question-'+i).css('line-height','18px');
                if (h < 36) $('#random-question-'+i).css('line-height','36px');
            }
            mixpanel.track("viewRandom");
        }

        $scope.showFrqPage = function(){
            //ruby.navigator.pushPage('html/frq-questions.html', {title: 'frequently asked questions'})
            ruby.navigator.pushPage('html/test.html', {title: 'frequently asked questions'})
        }



        $scope.seemore = function (answer) {
            mixpanel.track("seemore", {});
            $scope.dialog_seemore.show();


        }


        $scope.showInput = function () {
            $('#footer').height(footerHeight);
            $('#input').hide();
            $('.show-question').show();
            $('.button-request').show();
            $('#button-request').show();
        }



        $scope.btnQuestionClick = function () {
            $scope.dialog_frq.hide();
            mixpanel.track("ask", {'input': 'freq'});
            request(this.item.question);
        }


        $scope.closeAlert = function() {
            if(rubyDialog.dialog && rubyDialog.dialog.isShown()) {
                rubyDialog.dialog.hide();
            }
        };
    });


    module.controller('FrqQuestionController', function ($scope,$frqQuestions) {
        $scope.items = $frqQuestions.items;

        $scope.btnQuestionClick = function () {
            ons.navigator.popPage();
            mixpanel.track("ask", {'input': 'freq'});
            request(this.item.question);
        }

        $scope.showMainPage = function () {
            ons.navigator.popPage();
        }


    });

    module.factory('$frqQuestions', function () {
        var data = {};
        data.items = preFrqQuestions.items;
        return data;
    });


})();