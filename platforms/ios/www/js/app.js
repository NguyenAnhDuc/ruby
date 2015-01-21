(function(){
    'use strict';
    var module = angular.module('app', ['onsen']);
    var preFrqQuestions = {};
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            dataType: "text",
            url: "http://ruby.fti.pagekite.me/rubyweb/cinema",
            success: function (result) {
                preFrqQuestions.items = JSON.parse(result);
            }
        });


    });



    module.controller('FrqQuestionController', function($scope, $frqQuestions) {
        $scope.items = $frqQuestions.items;
    });


    /*module.controller('DialogController', function($scope) {
            $scope.reloadData = function(){
                $.ajax({
                    type: "GET",
                    dataType: "text",
                    async: "false",
                    url: "http://ruby.fti.pagekite.me/rubyweb/cinema",
                    success: function (result) {
                        $scope.items = JSON.parse(result);
                    }
                });
            }
    });
*/

    module.controller('MainCtrl', function($scope) {
        ons.createDialog('dialog.html').then(function(dialog) {
            $scope.dialog = dialog;
        });
        $scope.show = function() {
            $('.dialog-mask').show();
            $scope.dialog.show();
        }
    });


    module.factory('$frqQuestions', function() {
        var data = {};
        data.items = preFrqQuestions.items;
        return data;
    });


})();

