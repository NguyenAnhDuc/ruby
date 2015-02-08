<<<<<<< HEAD
//var HOST = "http://118.69.135.27/rubyweb";
//var HOST = "http://10.3.9.236/rubyweb";
var HOST = "http://ruby.fti.pagekite.me/rubyweb";
var TIME_OUT = 10000;
var rubyDialog = {};
var footerHeight = '100px';
var inputHeight = '44px';
=======
var HOST = "http://118.69.135.27/rubyweb";
//var HOST = "http://tech.fpt.com.vn/rubyweb";
//var HOST = "http://ruby.fti.pagekite.me/rubyweb"
var TIME_OUT = 5000;
var rubyDialog = {};
var footerHeight = '120px';
var inputHeight = '44px';
var errorStatus = "Có lỗi xảy ra. Xin bạn vui lòng kiểm tra kết nối internet hoặc thử lại!";
>>>>>>> 389eb16cc4ab5b0b47dcf633bf9104ff2af3d311
 // no '/'
//var HOST = "http://10.3.9.44:8080/rubyweb";


$(document).ready(function () {
    // call ajax to get list frequently question



    $('#btnSeeMore').hide();
    $('.full-answer').hide();
    $('#input').hide();
    $('.loading').hide();
    $('#footer').height(footerHeight);
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
        $('#footer').height(inputHeight);
        //$('#input').css('line-height','36px');
        $('#input').val('');
        $('.show-question').hide();
        // init state
        $('#input').show();
        $('#input').trigger('click');
        $('.button-request').hide();

    });


    //trigger enter key 
    $("#input").on("keypress", function(event){
        if (event.keyCode === 13) {
            var question = $('#input').val();
            mixpanel.track("ask", {'input': 'type'});
<<<<<<< HEAD
            if (question != '')
=======
            if (question.trim() != '')
>>>>>>> 389eb16cc4ab5b0b47dcf633bf9104ff2af3d311
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
        url: "http://Xem gì.fti.pagekite.me/rubyweb/cinema",
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
