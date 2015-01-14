(function(){
    'use strict';
    var module = angular.module('app', ['onsen']);

    module.controller('AppController', function($scope, $data) {
        $scope.doSomething = function() {
            setTimeout(function() {
                alert('tappaed');
            }, 100);
        };
    });

    module.controller('CinemaDetailController', function($scope, $data) {
        $scope.item = $data.selectedItem;
    });

    module.controller('CinemaController', function($scope, $data) {
        $scope.items = $data.items;

        $scope.showDetail = function(index) {
            var selectedItem = $data.items[index];

            var dataDetail = {};
            $.ajax({
                type: "GET",
                dataType: "text",
                async: false,
                url: "http://ruby.fti.pagekite.me/rubyweb/schedule/" + selectedItem.id,
                success: function(result){
                    dataDetail = JSON.parse(result);
                }
            });
            var listSchedules = [];
            for (var i=0;i<dataDetail.detail.length;i++)
            {
                var schedule = {};
                var times2D = [], times3D = [];
                var times = dataDetail.detail[i].pop();
                for (var j=0;j<times.length;j++){
                    if (times[j].type === '2D')
                        times2D.push(new Date(times[j].date).toLocaleTimeString().substring(0,5));
                    else
                        times3D.push(new Date(times[j].date).toLocaleTimeString().substring(0,5));
                }
                schedule.times2D = times2D.join(" ");
                schedule.times3D = times3D.join(" ");
                var info = dataDetail.detail[i].pop();
                if (info.movie === info.alias)
                    schedule.movie = info.movie;
                else
                    schedule.movie = info.movie + " (" + info.alias + ")";
                listSchedules.push(schedule);
            }
            $data.selectedItem = selectedItem;
            $data.selectedItem.schedules = listSchedules;
            $scope.ons.navigator.pushPage('cinemadetail.html', {title : selectedItem.title});
        };
    });

    module.controller('ChannelDetailController', function($scope, $data) {
        $scope.item = $data.selectedItem;
    });

    module.controller('ChannelController', function($scope, $data) {
        $scope.items = $data.items;

        $scope.showDetail = function(index) {
            var selectedItem = $data.items[index];
            $data.selectedItem = selectedItem;
            $scope.ons.navigator.pushPage('channeldetail.html', {title : selectedItem.title});
        };
    });

    module.factory('$data', function() {

        var data = {};

        $.ajax({
            type: "GET",
            dataType: "text",
            async: false,
            url: "http://ruby.fti.pagekite.me/rubyweb/cinema",
            success: function(result){
                data.items = JSON.parse(result);
            }
        });
        /*data.items = [
            {
                title: 'TT Chiếu Phim Quốc Gia',
                mobile: '043 514 1791',
                location: '87 Láng Hạ',
                image : 'http://d22acspji6czwh.cloudfront.net/cin_thumb_cgvvincom.jpg'
            },
            {
                title: 'Lotte Cinema Landmark',
                mobile: '04 3837 8035',
                location: 'Kaengnam, Phạm Hùng',
                image: 'img/cinemas/lotte_landmark.jpg'
            },
            {
                title: 'Lotte Hà Đông',
                mobile: '043 355 8011',
                location: 'Mê Linh Plaza Hà Đông',
                image : 'img/cinemas/cin_thumb_lottehadong.jpg'
            },
            {
                title: 'Platinum Garden Mall ',
                mobile: '043 7878 555',
                location: 'Garden, Mễ Trì',
                image : 'img/cinemas/cin_thumb_plantiumgarden.jpg'
            },
            {
                title: 'Platinum Vincom Royal City',
                mobile: '04 6267 4444',
                location: 'Royal City Nguyễn Trãi',
                image : 'img/cinemas/cin_thumb_cgvroyal.jpg'
            }

        ];*/
        return data;

    });
})();

