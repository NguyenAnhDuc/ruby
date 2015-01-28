function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildHistory(question, answer, count_request, count_carousel){
    var result = "";
    var style = " style=\"width: 100%; position: absolute; height: 100%; top: 0px; visibility: visible; left: " +  count_carousel*100 + "%; transform: translate3d(0px, 0px, 0px); transition: all 0.4s cubic-bezier(0.1, 0.4, 0.1, 1) 0s;\"";
    var data_style = " data-animit-orig-style=\"width: 100%; position: absolute; height: 100%; top: 0px; visibility: visible; left: " + count_carousel*100 + "%;\">";

    result = result.concat("<ons-carousel-item" +style + data_style);

<<<<<<< HEAD
    result = result.concat("<div class=\"your-question content center width-90\" id=\"your-question-" + count_request + "\">" + question + "</div>");
    result = result.concat("<div class=\"show-answer\">" );
    result = result.concat("<div class=\"answer-box\">"  );

    result = result.concat("<div class=\"content content-answer\" id=\"answer-" + count_request + "\">"  + answer + "</div>");
    result = result.concat("<div class=\"full-answer\" id=\"full-answer-" + count_request + "\">"  + answer + "</div>");
=======
    result = result.concat("<ons-scroller>");

    result = result.concat("<div class=\"your-question content center width-90\" id=\"your-question\">" + question + "</div>");
    result = result.concat("<div class=\"show-answer\">" );
    result = result.concat("<div class=\"answer-box\">"  );

    result = result.concat("<div class=\"content content-answer\" id=\"answer\">" + answer + "</div>");
    result = result.concat("<div class=\"full-answer\" id=\"full-answer\">" + answer + "</div>");
>>>>>>> analytics


    result = result.concat(" <div class=\"spinner loading center\" >");
    result = result.concat("  <div class=\"bounce1\"></div>");
    result = result.concat("  <div class=\"bounce2\"></div>");
    result = result.concat("  <div class=\"bounce3\"></div>");
    result = result.concat("</div>");

    result = result.concat("</div>");
    result = result.concat("</div>");

    result = result.concat("</ons-scroller>");

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

<<<<<<< HEAD
var count_request = 0, count_carousel = 0, max_carousel = 3;
function seemore(){
    angular.element($('#wrapper')).scope().seemore();
    var index = ruby.carousel.getActiveCarouselItemIndex();
    if (count_request > max_carousel) index = count_request - max_carousel + index + 1;
    $('#full-answer-show').html($('#full-answer-' + index ).html());
    //$('#modal').html($('#full-answer').html());
}


function request(quesiton){
    count_request++;
    count_carousel++;
    if (count_carousel >= (max_carousel + 1)) count_carousel --;
    ajax_request(quesiton,count_request,count_carousel);
=======

function seemore(){
    angular.element($('#wrapper')).scope().seemore();
    $('#full-answer-show').html($('#full-answer').html());
    //$('#modal').html($('#full-answer').html());
}

var count_request = 0, count = 0;
function request(quesiton){
    count_request++;
    count++;
    if (count > 10) count --;
    ajax_request(quesiton,count);
>>>>>>> analytics
}
