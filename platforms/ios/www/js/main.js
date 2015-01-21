$(document).ready(function () {

    //$('#input').focus();
    // init
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

                    if (result.question != null){
                        $('#question').hide();
                        $('.recommend-question').show();
                        $('#recommend-question').html(result.question);
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


    // DIALOG
    $(document).ready(function () {
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

})