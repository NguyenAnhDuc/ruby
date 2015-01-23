function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildHistory(question, answer, count){
    var result = "";
    var style = " style=\"width: 100%; position: absolute; height: 100%; top: 0px; visibility: visible; left: " +  count*100 + "%; transform: translate3d(0px, 0px, 0px); transition: all 0.4s cubic-bezier(0.1, 0.4, 0.1, 1) 0s;\"";
    var data_style = " data-animit-orig-style=\"width: 100%; position: absolute; height: 100%; top: 0px; visibility: visible; left: " + count*100 + "%;\">";
    result = result.concat("<ons-carousel-item" +style + data_style);
    result = result.concat("<div class=\"content\" id=\"answer\">" + answer);
    result = result.concat("</div>");
    result = result.concat(" </ons-carousel-item>");
    return result;
}

function removeFirstCoursel(htmlHistory){
    var index = htmlHistory.indexOf("</ons-carousel-item>") + 20;
    var result = htmlHistory.substring(index);
    result = result.replace(/left: 100%/g,'left: 0%');
    result = result.replace(/left: 200%/g,'left: 100%');
    result = result.replace(/left: 300%/g,'left: 200%');
    result = result.replace(/left: 400%/g,'left: 300%');
    result = result.replace(/left: 500%/g,'left: 400%');
    result = result.replace(/left: 600%/g,'left: 500%');
    result = result.replace(/left: 700%/g,'left: 600%');
    result = result.replace(/left: 800%/g,'left: 700%');
    result = result.replace(/left: 900%/g,'left: 800%');
    result = result.replace(/left: 1000%/g,'left: 900%');
    return result;
}

// ajax request to server
function ajax_request(question,count){

    $('#answer').attr('id','old-answer');
    var htmlHistory = $('#history-carousel').html();
    $('.content').hide();

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
            url: "http://ruby.fti.pagekite.me/rubyweb/ans",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            data: "question=" + encodeURIComponent(question) + "&confirmWebSearch=" + encodeURIComponent("yes"),
            success: function (result) {
                // build history
                var htmlHistory = $('#history-carousel').html();
                htmlHistory = htmlHistory.concat(buildHistory(question,result.answer,count));
                if (count > 10) htmlHistory = removeFirstCoursel(htmlHistory);
                $('#history-carousel').html(htmlHistory);
                ruby.carousel.last();
                $('.content').show();

                $('.loading').hide();
//                    $('#answer').html(result.answer);
//                    if ($('#answer').height() > 200){
                $('.image').hide();
                $('.show-answer').height('100%');



                if (result.related != null){
                    $('#question').hide();
                    $('.recommend-question').show();
                    $('#recommend-question').html(result.related.suggest);
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