(function(){
    'use strict';
    var module = angular.module('app', ['onsen']);
    var preFrqQuestions = {};

    // get Rankdom INT
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function buildHistory(question, answer){
        var result = "";
        result = result.concat("<ons-carousel-item data-animit-orig-style=\"width: 100%; position: absolute; height: 100%; top: 0px; visibility: visible; left: 100%;\" style=\"width: 100%; position: absolute; height: 100%; top: 0px; visibility: visible; left: 100%; transform: translate3d(0px, 0px, 0px); transition: all 0.3s cubic-bezier(0.1, 0.7, 0.1, 1) 0s;\">");
        result = result.concat("<div class=\"your-question\" id=\"your-question\" style=\"margin-bottom: 20px\">" + question);
        result = result.concat("</div>");
        result = result.concat("<div class=\"content\" id=\"answer\">" + answer);
        result = result.concat("</div>");
        result = result.concat(" </ons-carousel-item>");
        return result;
    }

    // ajax request to server
    function request(question){
        $('#answer').html('');
        $('.show-answer').height('10%');
        // loading

        $('.image').show();
        $('.loading').show();
        // hide keyboard
        $('#input').blur();


        // footer
        $('#input').hide();
        $('#question').html(question);
        $('.recommend-question').hide();
        $('#footer').height('20%');
        $('.button-request').hide();
        $('.show-question').show();
        $('#question').show();
        // send request
        $
            .ajax({
                type: "POST",
                url: "http://ruby.fti.pagekite.me/rubyweb/getAnswer",
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                data: "question=" + encodeURIComponent(question) + "&confirmWebSearch=" + encodeURIComponent("yes"),
                success: function (result) {
                    $('.loading').hide();
                    $('#answer').html(result.answer);
                    if ($('#answer').height() > 200){
                        $('.image').hide();
                        $('.show-answer').height('100%');
                    }

                    // build history
                    var html = $('#history-carousel').html();
                    html = html.concat(buildHistory(question,result.answer));
                    $('#history-carousel').html(html);

                    if (result.question != null){
                        $('#question').hide();
                        $('.recommend-question').show();
                        $('#recommend-question').html(result.question);
                        var random = getRandomInt(1,4);
                        if (random === 1) $('#recommend-question').css('background-color','lightseagreen');
                        if (random === 2) $('#recommend-question').css('background-color','lightcoral');
                        if (random === 3) $('#recommend-question').css('background-color','plum');
                        $('#your-question').html(question);
                    }

                    $('#answer').show();
                    $('.button-request').show();
                    $('#button-request').show();
                    $('#button-request').html('Chạm để sửa');

                },
                error: function (result) {
                    alert("Error");
                }
            });
    }
    $(document).ready(function () {

        // call ajax to get list frequently question
        $.ajax({
            type: "GET",
            dataType: "text",
            url: "http://ruby.fti.pagekite.me/rubyweb/cinema",
            success: function (result) {
                preFrqQuestions.items = JSON.parse(result);
            }
        });

        $('#input').hide();
        $('.loading').hide();
        $('.recommend-question').hide();


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
            request(this.item.name);
        }
    });


    module.controller('MainCtrl', function($scope) {
        ons.createDialog('dialog.html').then(function(dialog) {
            $scope.dialog = dialog;
        });
        $scope.show = function() {
            $('.dialog-mask').show();
            $scope.dialog.show();
        }

        $scope.showHistoryPage = function(){
            ons.navigator.pushPage('html/history.html', {title: 'history questions'});
        }

        $scope.showFrqPage = function(){
            ons.navigator.pushPage('html/frq-questions.html', {title:'frequently asked questions'})
        }
    });


    module.factory('$frqQuestions', function() {
        var data = {};
        data.items = preFrqQuestions.items;
        return data;
    });


})();

