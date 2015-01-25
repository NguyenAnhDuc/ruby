(function(){
    'use strict';
    var module = angular.module('app', ['onsen']);
    var networkErrorString = "Tôi không thể tìm thấy kết nối internet, bạn hãy kiểm tra lại được không?";
    var preFrqQuestions = {};
    var count_request = 0;

    // check internet connection
    var connectionStatus = false;



    // get Rankdom INT
    function request(quesiton){
        count_request++;
        if (count_request > 10) count_request --;
        ajax_request(quesiton,count_request);
    }

    $(document).ready(function () {
        // call ajax to get list frequently question
        $.ajax({
            type: "GET",
            dataType: "text",
            url: "http://ruby.fti.pagekite.me/rubyweb/info/frequent",
            success: function (result) {
                preFrqQuestions.items = JSON.parse(result);
            }
        });

        $('#input').hide();
        $('.loading').hide();
        //$('.recommend-question').hide();


        $('#input').click(function (e) {
            $(this).focus();
        });

        $('#button-request').click(function (e) {
            // footer
            $('#button-request').hide();
            $('#footer').height('5%');
            $('#input').val('');
            $('.show-question').hide();

            // init state
            $('#input').show();
            $('#input').trigger('click');
        });

        // function send request. Paramater: question


        //trigger enter key
        $("#input").on("keypress", function(event){
            if (event.keyCode === 13) {
                var question = $('#input').val();
                request(question);
            }
        });

        //recommend question
        $('#recommend-question').click(function (e) {
            var question = $('#recommend-question').text();
            request(question);
        });


        // DIALOG for random question
        $('.random-question').hide();
        $('#random-loading').show();
        $.ajax({
            type: "GET",
            dataType: "text",
            url: "http://ruby.fti.pagekite.me/rubyweb/cinema",
            success: function (result) {
                $('.random-question').show();
                $('#random-loading').hide();
                var items = JSON.parse(result);
                $('#random-question-1').html(items[1].name);
                $('#random-question-2').html(items[2].name);
                $('#random-question-3').html(items[3].name);

            }
        });
        $('#random-question-1').click(function (e) {
            var question = $('#random-question-1').text();
            $('.dialog').hide();
            $('.dialog-mask').hide();
            request(question);
        });
        $('#random-question-2').click(function (e) {
            var question = $('#random-question-2').text();
            $('.dialog').hide();
            $('.dialog-mask').hide();
            request(question);
        });
        $('#random-question-3').click(function (e) {
            var question = $('#random-question-3').text();
            $('.dialog').hide();
            $('.dialog-mask').hide();
            request(question);
        });


    });



    module.controller('FrqQuestionController', function($scope, $frqQuestions) {
        $scope.items = $frqQuestions.items;

        $scope.btnQuestionClick = function(){
            ons.navigator.popPage();
            request(this.item.question);
        }
    });


    module.controller('MainCtrl', function($scope) {
        ons.createDialog('dialog.html').then(function(dialog) {
            $scope.dialog = dialog;
        });

        /*ons.createDialog('seemore.html').then(function(dialog) {
            $scope.dialog_seemore = dialog;
        });*/
        $scope.show = function() {
            $('.dialog-mask').show();
            $scope.dialog.show();
        }
        $scope.seemore = function (answer) {
            $(".content-body").hide();
            $('#footer').hide();
            $('#modal').html(answer);
            $scope.ruby.modal.show();
        }
        $scope.hideSeemore = function () {
            $scope.ruby.modal.hide();
            $(".content-body").show();
            $('#footer').show();
        }

        $scope.showHistoryPage = function(){
            ruby.navigator.pushPage('html/history.html', {title: 'history questions'});
        }

        $scope.showFrqPage = function(){
            ruby.navigator.pushPage('html/frq-questions.html', {title:'frequently asked questions'})
        }
    });


    module.factory('$frqQuestions', function() {
        var data = {};
        data.items = preFrqQuestions.items;
        return data;
    });


})();
