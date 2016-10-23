var socket = new WebSocket('ws://104.236.146.40:1880/candyUserCheckin');

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
            },
            {
                path: '/waiting',
                name: 'Map2',
                component: 'providerMap2'
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
    });
angular.module('provider')
    .component('providerMap2', {
        templateUrl: 'partials/map2.html',
        controller: MapCtrl
    });

function AppCtrl() {
    console.debug('provider app');
}

function FormCtrl($http, $mdDialog) {
    console.debug('provider form component');
    var vm = this;
    vm.type = 'holiday';
    vm.title = 'Halloween';
    vm.description = 'Spooky fun festival for kids and adults 🎃';

    vm.checkout = function(ev) {
        $http.post('http://104.236.146.40:1880/p2p')
            .then(() => {
                $http.post('http://104.236.146.40:1880/candyProviders', {
                    "providerName": "money2020",
                    "providerDisplayName": "Angel Hack",
                    "providerPofile": "https://scontent.flas1-2.fna.fbcdn.net/t31.0-8/13320879_992792147484559_3401961512810085185_o.jpg",
                    "lat": 36.1221811,
                    "long": -115.1699481,
                    "isAdvertised": true,
                    "candies": [
                        {
                            "candyObject": {
                                "eventName": "halloween",
                                "eventDisplayName": "Halloween",
                                "eventDescription": "spooky fun festival for kids and adults",
                                "candyType": "bite-size-candy",
                                "candyName": "Bite-Sized Candy",
                                "candyImageName": "bite-size.svg",
                                "candyDescription": "cheap candy from cheap people lol",
                                "candyConversionRate": 0.05
                            },
                            "count": 20
                        },
                        {
                            "candyObject": {
                                "eventName": "halloween",
                                "eventDisplayName": "Halloween",
                                "eventDescription": "spooky fun festival for kids and adults",
                                "candyType": "normal-candy",
                                "candyName": "Normal Candy",
                                "candyImageName": "normal-size.svg",
                                "candyDescription": "your everyday standard candy",
                                "candyConversionRate": 0.1
                            },
                            "count": 10
                        },
                        {
                            "candyObject": {
                                "eventName": "halloween",
                                "eventDisplayName": "Halloween",
                                "eventDescription": "spooky fun festival for kids and adults",
                                "candyType": "full-size-candy",
                                "candyName": "Full-Size Candy",
                                "candyImageName": "full-size.svg",
                                "candyDescription": "only the rich and elite can afford this. Full-sized bars",
                                "candyConversionRate": 0.5
                            },
                            "count": 5
                        }
                    ]
                }).then(() => {
                    return $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .clickOutsideToClose(true)
                            .title('🎉 Thanks 🎉')
                            .textContent('Your event was purchased')
                            .ariaLabel('Event shared')
                            .ok('👍')
                            .targetEvent(ev)
                    );
                })
                .then(function() {
                    vm.$router.navigate(['Map2']);                   
                });
            })
    }
}

function MapCtrl($http, $timeout, $mdDialog) {
    console.debug('provider map component');
    var vm = this;
    socket.onmessage = function(event) {
        console.debug(event.data);
        vm.visitor = JSON.parse(event.data);
        showRequest();
    };

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

    function showRequest() {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'partials/request.html',
            parent: angular.element(document.body)
        })
        .then(function(answer) {
            console.log('giving ' + JSON.stringify(answer));
            for (var i = 0; i < answer.length; i++) {
                vm.visitor.candies[i].count += answer[i];
            }
            console.log(vm.visitor);
            socket.send(JSON.stringify(vm.visitor));
        }, function() {
            console.debug('cancelled dialog');
        });
    }
}

function DialogController($scope, $mdDialog) {
    console.debug('DialogController');

    $scope.candyCount = [0, 0, 0];

    $scope.increaseCount = function(index) {
        $scope.candyCount[index] ++;
    };

    $scope.reset = function() {
        $scope.candyCount = [0, 0, 0];
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.give = function() {
        $mdDialog.hide($scope.candyCount);
    };
}