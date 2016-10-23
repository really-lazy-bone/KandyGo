angular.module('provider', ['ngComponentRouter']);
angular.module('provider')
    .value('$routerRootComponent', 'providerApp');

angular.module('provider')
    .component('providerApp', {
        templateUrl: 'partials/app.html',
        controller: AppCtrl,
        $routeConfig: [
            {
                path: '/form', 
                name: 'Form', 
                component: 'providerForm',
                useAsDefault: true
            }
        ]
    });
angular.module('provider')
    .component('providerForm', {
        templateUrl: 'partials/form.html',
        controller: FormCtrl
    });

function AppCtrl() {
    console.debug('provider app');
}

function FormCtrl() {
    console.debug('provider form component');
}