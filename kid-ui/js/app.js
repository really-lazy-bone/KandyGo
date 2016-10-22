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
}

function ProfileCtrl() {
    console.debug('Hello profile component');
}