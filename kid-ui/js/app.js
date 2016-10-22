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
        template: `Hello kid profile`,
        controller: ProfileCtrl
    });

function AppCtrl() {
    console.debug('Hello kid app');
}

function MapCtrl() {
    console.debug('Hello map component');

//36.1211783,-115.1718413,17
    var mymap = L.map('mapid').setView([36.1211783, -115.1718413,17], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'rcliao.cigfua5ev854ztdm6xuj8jj1g',
        accessToken: 'pk.eyJ1IjoicmNsaWFvIiwiYSI6ImNpZ2Z1YTZzdjd1ZXl0bW01eTl1N3JrNngifQ.wLdfXWUF0P2H2kiQxrjGXA'
    }).addTo(mymap);
}

function ProfileCtrl() {
    console.debug('Hello profile component');
}