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
            $data.selectedItem = selectedItem;
            $scope.ons.navigator.pushPage('cinemadetail.html', {title : selectedItem.title});
        };
    });

    module.factory('$data', function() {
        var data = {};

        data.items = [
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

        ];

        return data;
    });
})();

