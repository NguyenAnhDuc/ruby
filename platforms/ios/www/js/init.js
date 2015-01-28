$(document).ready(function () {
    // call ajax to get list frequently question

    $('#btnSeeMore').hide();
    $('.full-answer').hide();
    $('#input').hide();
    $('.loading').hide();
    //$('.recommend-question').hide();

<<<<<<< HEAD
<<<<<<< HEAD
=======
    $('#btnSeeMore').click(function() {
        mixpanel.track("seeMore", {});
    });
>>>>>>> analytics
=======
    $('#btnSeeMore').click(function() {
        mixpanel.track("seeMore", {});
    });
>>>>>>> analytics

    $('#input').click(function (e) {
        $(this).focus();
    });

    $('#button-request').click(function (e) {
        // footer
        $('#button-request').hide();
<<<<<<< HEAD
<<<<<<< HEAD
        $('#footer').height('10%');
=======
        $('#footer').height('5%');
>>>>>>> analytics
=======
        $('#footer').height('5%');
>>>>>>> analytics
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
            mixpanel.track("ask", {'input': 'type'});
>>>>>>> analytics
=======
            mixpanel.track("ask", {'input': 'type'});
>>>>>>> analytics
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
<<<<<<< HEAD
<<<<<<< HEAD
    /*$.ajax({
=======
    $.ajax({
>>>>>>> analytics
=======
    $.ajax({
>>>>>>> analytics
        type: "GET",
        dataType: "text",
        url: "http://ruby.fti.pagekite.me/rubyweb/cinema",
        success: function (result) {
<<<<<<< HEAD
<<<<<<< HEAD


        }
    });*/
=======
=======
>>>>>>> analytics
            $('.random-question').show();
            $('#random-loading').hide();
            var items = JSON.parse(result);
            $('#random-question-1').html(items[1].name);
            $('#random-question-2').html(items[2].name);
            $('#random-question-3').html(items[3].name);

        }
    });
<<<<<<< HEAD
>>>>>>> analytics
=======
>>>>>>> analytics
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
