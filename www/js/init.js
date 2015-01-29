var HOST = "http://ruby.fti.pagekite.me/rubyweb"; // no '/'
//var HOST = "http://10.3.9.44:8080/rubyweb";

$(document).ready(function () {
    // call ajax to get list frequently question

    $('#btnSeeMore').hide();
    $('.full-answer').hide();
    $('#input').hide();
    $('.loading').hide();
    $('#footer').height('20%');
    //$('.recommend-question').hide();
    $('#btnSeeMore').click(function() {
        mixpanel.track("seeMore", {});
    });

    $('#input').click(function (e) {
        $(this).focus();
    });

    $('#button-request').click(function (e) {
        // footer
        $('#button-request').hide();
        $('#footer').height('36px');
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
            mixpanel.track("ask", {'input': 'type'});
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
    /*$.ajax({
        type: "GET",
        dataType: "text",
        url: "http://ruby.fti.pagekite.me/rubyweb/cinema",
        success: function (result) {


        }
    });*/
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
