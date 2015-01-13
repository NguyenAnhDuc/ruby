/**
 * Created by DucNa on 1/12/15.
 */
function buildHtmlQuestion(question) {
    var htmlResult = "";
    //question
    htmlResult = htmlResult
        .concat("<ons-list-item class=\"ons-list-item right clearfix list__item ons-list-item-inner left clearfix\"><span class=\"chat-img pull-left\">");
    htmlResult = htmlResult
        .concat("<img src=\"img/u.gif\" alt=\"User Avatar\" class=\"img-circle\" /></span>");
    htmlResult = htmlResult
        .concat("<div class=\"chat-body clearfix\" style=\"margin-left: 60px;\" >");
    htmlResult = htmlResult.concat("<p>");
    htmlResult = htmlResult.concat(question);
    htmlResult = htmlResult.concat("</p></div></ons-list-item >");
    return htmlResult;
}

function buildHtmlAnswer( text) {
    var htmlResult = "";
    //answer
    htmlResult = htmlResult
        .concat("<ons-list-item  class=\"ons-list-item right clearfix list__item ons-list-item-inner right clearfix\"><span class=\"chat-img pull-right\">");
    htmlResult = htmlResult
        .concat("<img src=\"img/me.gif\" alt=\"User Avatar\" class=\"img-circle\" /></span>");
    htmlResult = htmlResult
        .concat("<div class=\" chat-body clearfix\">");
    htmlResult = htmlResult.concat("<p id=\"chat-answer\">");
    htmlResult = htmlResult.concat("<div class=\"spinner\" id=\"loading\">	<div class=\"bounce1\"></div> <div class=\"bounce2\"></div>	<div class=\"bounce3\"></div></div>");
    htmlResult = htmlResult.concat("</p></div></ons-list-item >");
    return htmlResult;
}

function onChat() {
    $('#chat-answer').attr('id','old-chat-answer');
    $('#loading').attr('id','old-loading')
    var question = $('#btn-input').val();
    $('#btn-input').val('');
    $('#currentqs').val(question);
    $('.panel-body').scrollTop(1E10);
    var oldHeight = $('.panel-body').scrollTop();
    var htmlResult = buildHtmlQuestion(question).concat(buildHtmlAnswer("ME"));
    $('.chat').append(htmlResult);
    $('.panel-body').scrollTop(oldHeight+400);
    $('#loading').show();
    $
        .ajax({
            type: "POST",
            url: "http://ruby.fti.pagekite.me/rubyweb/getAnswer",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            data: "question=" + encodeURIComponent(question) + "&confirmWebSearch=" + encodeURIComponent("yes"),
            success: function (result) {
                $('.spinner').hide();
                $('#chat-answer').html(result.answer);
            },
            error: function (result) {
                alert("Error");
            }
        });
}