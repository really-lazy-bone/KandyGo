angular.module('kid', ['ngComponentRouter']);

angular.module('kid')
    .value('$routerRootComponent', 'kidApp');

angular.module('kid')
    .config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    });

angular.module('kid')
    .component('kidApp', {
        templateUrl: 'partials/app.html',
        controller: AppCtrl,
        $routeConfig: [
            {
                path: '/map', 
                name: 'Map', 
                component: 'kidMap',
                useAsDefault: true
            },
            {
                path: '/profile',
                name: 'Profile',
                component: 'kidProfile'
            }
        ]
    });
angular.module('kid')
    .component('kidMap', {
        templateUrl: 'partials/map.html',
        controller: MapCtrl
    });
angular.module('kid')
    .component('kidProfile', {
        templateUrl: `partials/profile.html`,
        controller: ProfileCtrl
    });

function AppCtrl() {
    console.debug('Hello kid app');
}

function MapCtrl() {
    console.debug('Hello map component');
    var vm = this;
    vm.mymap = L.map('mapid').setView([36.1228808, -115.1669438,17], 18);

    navigator.geolocation.getCurrentPosition(function(position) {
        vm.me = addMarker(position.coords.latitude, position.coords.longitude);
        vm.mymap.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));

        console.log(position);
    });


    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'rcliao.cigfua5ev854ztdm6xuj8jj1g',
        accessToken: 'pk.eyJ1IjoicmNsaWFvIiwiYSI6ImNpZ2Z1YTZzdjd1ZXl0bW01eTl1N3JrNngifQ.wLdfXWUF0P2H2kiQxrjGXA'
    }).addTo(vm.mymap);

    function addMarker(lat, long) {
        return L.marker([lat, long]).addTo(vm.mymap);
    }
}

function ProfileCtrl() {
    console.debug('Hello profile component');
    var vm = this;
    vm.showVideo = true;
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    var image = document.getElementById('image');
    var profilePhoto = '';

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);

            video.play();
        });
    } 

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
        vm.showVideo = false;
        console.log(vm.showVideo);
        context.drawImage(video, 0, 0, 640, 480);
        var profilePhotoUrl = canvas.toDataURL();
        image.src = profilePhotoUrl;
    });

}