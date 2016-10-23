angular.module('kid', ['ngComponentRouter']);

angular.module('kid')
    .value('$routerRootComponent', 'kidApp');

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

function MapCtrl($http) {
    console.debug('Hello map component');
    var vm = this;
    vm.mymap = L.map('mapid').setView([36.1228808, -115.1669438,17], 15);
    var selfMarkerIcon = L.icon({
        iconUrl: '/assets/human-top-view.svg',
        iconSize: [23, 31],
        className: 'me marker'
    });
    var keyMarkerIcon = L.icon({
        iconUrl: '/assets/sm-lollipop.png',
    });
    $http.get('http://104.236.146.40:1880/candyUsers')
        .then(function(response) {
            vm.users = response.data;
            vm.currentUser = vm.users[0];
        });

    navigator.geolocation.getCurrentPosition(function(position) {
        vm.me = addMarker(position.coords.latitude, position.coords.longitude, {
            icon: selfMarkerIcon
        });
        vm.radius = L.circle([position.coords.latitude, position.coords.longitude], {
            weight: 2,
            color: '#fff',
            fillColor: '#fff',
            fillOpacity: 0.1,
            radius: 100
        }).addTo(vm.mymap);
        vm.mymap.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
    }, function(err) {
        alert(err);
        alert('Failed to get current location');
    });

    $http.get('http://104.236.146.40:1880/candyProviders')
        .then(response => {
            vm.providers = response.data;
            console.debug(vm.providers);
            vm.providers.forEach(provider => {
                provider.marker = addMarker(provider.lat, provider.long, {
                    icon: keyMarkerIcon
                });
                provider.marker.on('click', function() {
                    console.debug('clicked on provider ' + provider.providerDisplayName);
                });
            });
        })

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'rcliao.cigfua5ev854ztdm6xuj8jj1g',
        accessToken: 'pk.eyJ1IjoicmNsaWFvIiwiYSI6ImNpZ2Z1YTZzdjd1ZXl0bW01eTl1N3JrNngifQ.wLdfXWUF0P2H2kiQxrjGXA'
    }).addTo(vm.mymap);

    function addMarker(lat, long, option) {
        return L.marker([lat, long], option).addTo(vm.mymap);
    }
}

function ProfileCtrl() {
    console.debug('Hello profile component');
    var vm = this;
    vm.showVideo = true;
    vm.updateView = updateView;
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
        context.drawImage(video, 0, 0, 640, 480);
        var profilePhotoUrl = canvas.toDataURL();
        image.src = profilePhotoUrl;
    });

    function updateView () {
        vm.showVideo = !vm.showVideo;
    }

}