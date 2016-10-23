angular.module('kid', ['ngComponentRouter', 'ngTouch']);

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

function MapCtrl($http, $scope) {
    console.debug('Hello map component');
    var vm = this;
    vm.mymap = L.map('mapid').setView([36.1228808, -115.1669438,17], 15);
    
    vm.showProviderInfo = showProviderInfo;
    vm.hideProviderInfo = hideProviderInfo;
    vm.swipe = swipe;

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
    // 36.1183782,-115.1711297
    var currentLat = 36.1183782;
    var currentLong = -115.1711297;

    $http.get('http://104.236.146.40:1880/candyProviders')
        .then(response => {
            vm.providers = response.data;
            console.debug(vm.providers);
            vm.providers.forEach(provider => {
                provider.marker = addMarker(provider.lat, provider.long, {
                    icon: keyMarkerIcon
                });
                provider.marker.on('click', function() {
                    vm.currentProvider = provider;
                    $scope.$apply();
                    console.debug('clicked on provider ' + provider.providerDisplayName);
                    showProviderInfo(provider);
                });
            });
        });

    function showProviderInfo(provider) {
        //open modal of static image of provider
        document.getElementById('providerInfo').classList.remove('hide');
    }

    function hideProviderInfo() {
        document.getElementById('providerInfo').classList.add('hide');
        vm.currentProvider = '';
    }

    function swipe(direction) {
        var flipper = document.getElementById('image_flipper');
        flipper.classList.remove('swipe');
        flipper.classList.remove('right');
        if (direction === 'left') {
            flipper.classList.add('swipe');
        } else {
            flipper.classList.add('swipe', 'right');
        }
        console.log('swiped the event with ' + direction);
    }

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'rcliao.cigfua5ev854ztdm6xuj8jj1g',
        accessToken: 'pk.eyJ1IjoicmNsaWFvIiwiYSI6ImNpZ2Z1YTZzdjd1ZXl0bW01eTl1N3JrNngifQ.wLdfXWUF0P2H2kiQxrjGXA'
    }).addTo(vm.mymap);
    // navigator.geolocation.getCurrentPosition(function(position) {
        vm.me = addMarker(currentLat, currentLong, {
            icon: selfMarkerIcon
        });
        vm.radius = L.circle([currentLat, currentLong], {
            weight: 2,
            color: '#fff',
            fillColor: '#fff',
            fillOpacity: 0.1,
            radius: 100
        }).addTo(vm.mymap);
        vm.mymap.panTo(new L.LatLng(currentLat, currentLong));
    // }, function(err) {
    //     alert(err);
    //     alert('Failed to get current location');
    // });

    function addMarker(lat, long, option) {
        return L.marker([lat, long], option).addTo(vm.mymap);
    }
}

function ProfileCtrl($scope) {
    console.debug('Hello profile component');
    var vm = this;
    vm.showVideo = true;
    var image = document.getElementById('image');
    var camera = document.getElementById('camera');
    var profilePhoto = '';
    camera.onchange = function(evt) {
        var files = evt.target.files;
        console.log(files);
        if (!files.length) {
            return;
        }
        var file = files[0];
        var reader  = new FileReader();
        // inject an image with the src url
        reader.onload = function(event) {
            vm.profilePhoto = event.target.result;
            image.src = vm.profilePhoto;
            $scope.$apply();
        };
        reader.readAsDataURL(file);
    };

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
        camera.click();
    });
}