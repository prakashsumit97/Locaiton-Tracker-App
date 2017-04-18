angular.module('AllSearchCtrl', []).controller('AllSearchController', function ($scope, Location, $state, $scope, allSearches) {
    $scope.allSearchData = allSearches;
});
