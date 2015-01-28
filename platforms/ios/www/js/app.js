(function(){
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
            }
        });

        $.ajax({
            type: "GET",
            dataType: "text",
            url: HOST + "/info/frequent",
            success: function (result) {
                randomQuestions.items = JSON.parse(result);
            }
        });
    });





    module.controller('FrqQuestionController', function($scope, $frqQuestions) {
        $scope.items = $frqQuestions.items;

        $scope.btnQuestionClick = function(){
            ons.navigator.popPage();
            mixpanel.track("ask", {'input': 'freq'});
            request(this.item.question);
        }
    });


    module.controller('MainCtrl', function($scope) {
        ons.createDialog('dialog.html').then(function(dialog) {
            $scope.dialog = dialog;
        });

        ons.createDialog('seemore.html').then(function(dialog) {
            $scope.dialog_seemore = dialog;
        });
        $scope.show = function() {
            $('.dialog-mask').show();
            $scope.dialog.show();
            $('.random-question').show();
            var items = randomQuestions.items;
            $('#random-question-1').html(items[1].name);
            $('#random-question-2').html(items[2].name);
            $('#random-question-3').html(items[3].name);
        }
        $scope.seemore = function (answer) {
            mixpanel.track("seemore", {});
            $scope.dialog_seemore.show();


        }
        $scope.hideSeemore = function () {

        }

        $scope.showFrqPage = function(){
            mixpanel.track("viewFrequent");
            ruby.navigator.pushPage('html/frq-questions.html', {title:'frequently asked questions'})
        }
    });



    module.factory('$frqQuestions', function() {
        var data = {};
        data.items = preFrqQuestions.items;
        return data;
    });




})();
