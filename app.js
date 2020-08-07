var primoApp = wag.module('primoApp', []);

primoApp.controller('primoController', function($scope) {
// primoApp.controller('primoController', function($scope, $http) {
    let vm = this;
    $scope.nome = 'Wagner0000';
    setTimeout(function() {
        $scope.nome = 'Wagner1';
    }, 100);
});
