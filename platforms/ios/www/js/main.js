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
        $('.show-answer').height('40%');

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

})