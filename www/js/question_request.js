// ajax request to server
function ajax_request(question,count_request, count_carousel){
    var carousel_index = ruby.carousel.getActiveCarouselItemIndex();
    $('.your-question').hide();
    /*$('#your-question').attr('id','your-question-' + carousel_index);
    $('#full-answer').attr('id','full-answer-' + carousel_index);
    $('#answer').attr('id','answer-'+carousel_index);*/
    var htmlHistory = $('#history-carousel').html();
    $('.content').hide();

    //$('.show-answer').height('10%');
    // loading

    $('.image').show();
    $('.loading').show();
    // hide keyboard
    $('#input').blur();


    // footer
    $('#input').hide();
    $('#question').html(question);
    $('.recommend-question').hide();
    $('#footer').height('25%');
    $('.button-request').hide();
    $('.show-question').show();
    $('#question').show();
    // send request
    $
        .ajax({
            type: "POST",
            url: HOST + "/ans",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            data: "question=" + encodeURIComponent(question) + "&confirmWebSearch=" + encodeURIComponent("yes"),
            success: function (result) {

                // build history
                var htmlHistory = $('#history-carousel').html();
                htmlHistory = htmlHistory.concat(buildHistory(question,result.answer,count_request,count_carousel));
                if (count_carousel >= max_carousel) htmlHistory = removeFirstCoursel(htmlHistory);
                $('#history-carousel').html(htmlHistory);
                $('#your-question-'+count_request).html(question);
                $('.your-question').show();
                ruby.carousel.last();
                $('.content').show();
                $('#answer-' + count_request).show();

                var length = "short";
                // check to build seemore button
                if ($('#answer-' + count_request).height() > $('#wrapper').height()*0.5){
                    var htmlAnswer = result.answer.substring(0,300);
                    var end = htmlAnswer.lastIndexOf("</br>");
                    htmlAnswer = htmlAnswer.substring(0,end).concat("</br>" + " ...");
                    var htmlSeeMore = "<div class=\"center\">";
                    htmlSeeMore = htmlSeeMore.concat("<ons-button onclick=\"seemore()\" modifier=\"outline\" style=\"margin-top: 10px\" id=\"btnSeeMore\" class=\" btnSeeMore ng-isolate-scope button effeckt-button button--outline slide-left\"><span class=\"label ons-button-inner\"><span class=\"ng-scope\">Xem thêm</span></span>"
                        + "<span class=\"spinner button__spinner button--outline__spinner\"></span></ons-button></div>");

                    $('#answer-'+count_request).html(htmlAnswer + htmlSeeMore);

                    length = "long";
                }

                mixpanel.track("ans", {"code": result.answer.indexOf("Opps,") == -1 ? "ok" : "no-ans", "length": length, "domain": result.domain, "intent": result.intent, "tv": result.tvMods, "mv": result.mvMods});

                $('.full-answer').hide();

                $('.loading').hide();
                $('.image').hide();

                if (result.related != null){
                    $('#question').hide();
                    $('.recommend-question').show();
                    $('#recommend-question').html(result.related.suggest);
                    var random = getRandomInt(1,4);
                    if (random === 1) $('#recommend-question').css('background-color','#00ACE9');  //lightseagreen
                    if (random === 2) $('#recommend-question').css('background-color','#D43F3F'); //lightcoral
                    if (random === 3) $('#recommend-question').css('background-color','#6A9A1F');
                    /*if ($('#recommend-question').height() > 36) $('#recommend-question').css('line-height','18px');
                    if ($('#recommend-question').height() === 18) $('#recommend-question').css('line-height','36px');*/

                }

                $('.button-request').show();
                $('#button-request').show();
                $('#button-request').html('Chạm để hỏi');

            },
            error: function (result) {
                mixpanel.track("ans", {"code": "err"});
                alert("Error");
            }
        });
}
