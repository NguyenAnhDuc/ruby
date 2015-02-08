function displayProcess(question, answer){
    // build history
    var htmlHistory = $('#history-carousel').html();
    htmlHistory = htmlHistory.concat(buildHistory(question,answer,count_request,count_carousel));
    if (count_carousel >= max_carousel) htmlHistory = removeFirstCoursel(htmlHistory);
    $('#history-carousel').html(htmlHistory);
    $('#your-question-'+count_request).html(question);
    $('.your-question').show();
    ruby.carousel.last();
    $('.content').show();
    $('#answer-' + count_request).show();


    $('.full-answer').hide();

    $('.loading').hide();
    $('.image').hide();
    $('#input').hide();


    $('.button-request').show();
    $('#button-request').show();
    $('#button-request').html('Chạm để hỏi');

}



function formatAnswer(answer){
    var result = "<ul>";
    var list = answer.split('</br>');
    if (list.length < 2)
        return answer;

    for (var i=0;i<list.length;i++){
        if (list[i].replace('</br>','').trim() != '')
            result = result.concat("<li>" + list[i].replace('</br>','') + '</li>');
    }

    result = result.concat("</ul>");
    return result;
}

// ajax request to server
function ajax_request(question,count_request, count_carousel){
    var carousel_index = ruby.carousel.getActiveCarouselItemIndex();
    $('.your-question').hide();
    var htmlHistory = $('#history-carousel').html();
    $('.content').hide();
    $('.image').show();
    $('.loading').show();
    // hide keyboard
    $('#input').blur();


    // footer
    $('#input').hide();
    $('#question').html(question);
    $('.recommend-question').hide();
    $('#footer').height(footerHeight);
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
                var answer = formatAnswer(result.answer);
                displayProcess(question,answer);

                var length = "short";
                // check to build seemore button
                var k = 0.45;
                if ($('#answer-' + count_request).height() > $('#wrapper').height()*k){
                    var htmlAnswer = answer.substring(0, Math.round($('#wrapper').height() * k));
                    var end = htmlAnswer.lastIndexOf("</li>");
                    if (end === -1) end = htmlAnswer.lastIndexOf(" ");
                    htmlAnswer = htmlAnswer.substring(0,end) + "  . . . </li>";
                    var htmlSeeMore = "<div class=\"center\" id=\"seemore-row\">";
                    htmlSeeMore = htmlSeeMore.concat("<ons-button onclick=\"seemore()\" modifier=\"outline\" style=\"margin-top: 10px\" id=\"btnSeeMore\" class=\" btnSeeMore ng-isolate-scope button effeckt-button button--outline slide-left\"><span class=\"label ons-button-inner\"><span class=\"ng-scope\">Xem thêm</span></span>"
                        + "<span class=\"spinner button__spinner button--outline__spinner\"></span></ons-button></div>");

                    $('#answer-'+count_request).html(htmlAnswer + htmlSeeMore);

                    length = "long";
                }

                mixpanel.track("ans", {"code": result.answer.indexOf("Opps,") == -1 ? "ok" : "no-ans", "length": length, "domain": result.domain, "intent": result.intent, "tv": result.tvMods, "mv": result.mvMods});


                if (result.related != null){
                    $('#question').hide();
                    $('.recommend-question').show();
                    $('#recommend-question-text').html(result.related.suggest);
                    var random = getRandomInt(1,4);
                    if (random === 1) $('#recommend-question').css('background-color','#9E4E4F');  //lightseagreen
                    if (random === 2) $('#recommend-question').css('background-color','#D43F3F'); //lightcoral
                    if (random === 3) $('#recommend-question').css('background-color','#6A9A1F');
                    if ($('#recommend-question').height() > 36) $('#recommend-question').css('line-height','18px');
                    if ($('#recommend-question').height() < 36) $('#recommend-question').css('line-height','36px');

                }


            },
            error: function (result) {
                displayProcess(question,errorStatus);

                mixpanel.track("ans", {"code": "err"});
                ons.createAlertDialog('alert.html').then(function(alertDialog) {
                    rubyDialog.dialog = alertDialog;
                    alertDialog.show();
                    mixpanel.track('error',{'question':question});
                });
            },
            timeout: TIME_OUT
        });
}
