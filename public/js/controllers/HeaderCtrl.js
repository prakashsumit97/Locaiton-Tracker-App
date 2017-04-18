angular.module('HeaderCtrl', []).controller('HeaderController', function ($scope, Location, $state, $scope, $location) {

    $scope.menuCtrlObj = {
        currentState: "location"
    }


    Location.getSessionUser().then(function (success) {
        $scope.userInfo = success.data;
    }, function (error) {
        $state.go("login");
    });

    $scope.logout = function () {
        Location.logout().then(function (success) {
            $state.go('login');
        }, function (error) {
            console.log(error);
        });
    }

    if ($location.path() === "/allSearch") {
        $scope.menuCtrlObj.currentState = "allSearch";
    }

    if ($location.path() === "/location") {
        $scope.menuCtrlObj.currentState = "location";
    }

});
