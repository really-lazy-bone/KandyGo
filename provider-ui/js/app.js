angular.module('provider', ['ngComponentRouter', 'ngMaterial']);
angular.module('provider')
    .value('$routerRootComponent', 'providerApp');

angular.module('provider')
    .component('providerApp', {
        templateUrl: 'partials/app.html',
        controller: AppCtrl,
        $routeConfig: [
            {
                path: '/',
                name: 'Map',
                component: 'providerMap',
                useAsDefault: true
            },
            {
                path: '/form', 
                name: 'Form', 
                component: 'providerForm',
            },
            {
                path: '/form-2',
                name: 'Form2',
                component: 'providerForm2'
            }
        ]
    });
angular.module('provider')
    .component('providerForm', {
        templateUrl: 'partials/form.html',
        controller: FormCtrl
    });
angular.module('provider')
    .component('providerMap', {
        templateUrl: 'partials/map.html',
        controller: MapCtrl
    });
angular.module('provider')
    .component('providerForm2', {
        templateUrl: 'partials/form2.html',
        bindings: { $router: '<' },
        controller: FormCtrl
    })

function AppCtrl() {
    console.debug('provider app');
}

function FormCtrl($http, $mdDialog) {
    console.debug('provider form component');
    var vm = this;

    vm.checkout = function(ev) {
        $http.post('http://104.236.146.40:1880/p2p')
            .then(() => {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .clickOutsideToClose(true)
                        .title('Thanks!')
                        .textContent('Your event has been brought online!')
                        .ariaLabel('Event shared')
                        .ok('👍')
                        .targetEvent(ev)
                )
                .then(function() {
                    vm.$router.navigate(['Map']);                   
                });
            })
    }
}

function MapCtrl($http) {
    console.debug('provider map component');
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
    // 36.1183782,-115.1711297
    var currentLat = 36.1183782;
    var currentLong = -115.1711297;

    $http.get('http://104.236.146.40:1880/candyProviders')
        .then(response => {
            vm.providers = response.data;
            console.debug(vm.providers);
            vm.providers.forEach(provider => {
            });
        });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'rcliao.cigfua5ev854ztdm6xuj8jj1g',
        accessToken: 'pk.eyJ1IjoicmNsaWFvIiwiYSI6ImNpZ2Z1YTZzdjd1ZXl0bW01eTl1N3JrNngifQ.wLdfXWUF0P2H2kiQxrjGXA'
    }).addTo(vm.mymap);
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