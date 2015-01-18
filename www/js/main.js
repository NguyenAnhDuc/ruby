$(document).ready(function () {
    //$('#input').focus();
    // init
    $('#input').hide();
    $('#loading').hide();

    $('#input').click(function (e) {
        $(this).focus();
    });

    $('#button-request').click(function (e) {
        $('#input').show();
        $('#button-request').hide();
        $('#footer').height('5%');
        $('#input').val('');
        $('.show-question').hide();
        $('#input').trigger('click');
    });

    //trigger enter key
    $("#input").on("keypress", function(event){
        if (event.keyCode === 13) {
            // init state
            $('.show-answer').height('40%');
            $('.image').show();

            // loading
            $('#loading').show();
            $('#answer').html('');
            // hide keyboard
            $('#input').blur();
            var question = $('#input').val();

            // footer
            $('#input').hide();
            $('.show-question').html(question);
            $('#footer').height('20%');
            $('#button-request').show();
            $('.show-question').show();
            // send request
            $
                .ajax({
                    type: "POST",
                    url: "http://ruby.fti.pagekite.me/rubyweb/getAnswer",
                    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                    data: "question=" + encodeURIComponent(question) + "&confirmWebSearch=" + encodeURIComponent("yes"),
                    success: function (result) {
                        $('#loading').hide();
                        $('#answer').html(result.answer);
                        if ($('#answer').height() > 200){
                            $('.image').hide();
                            $('.show-answer').height('100%');
                        }
                        $('#answer').show();

                    },
                    error: function (result) {
                        alert("Error");
                    }
                });
        }
    });
})