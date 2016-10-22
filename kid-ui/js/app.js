angular.module('kid', []);

console.log(AppCtrl);

angular.module('kid')
    .component('kidApp', {
        templateUrl: 'partials/app.html',
        controller: AppCtrl
    });

function AppCtrl() {
    console.debug('Hello kid app');
}