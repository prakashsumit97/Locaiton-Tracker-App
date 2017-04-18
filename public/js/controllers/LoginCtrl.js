angular.module('LoginCtrl', []).controller('LoginController', function ($scope, Location, $state) {
    $scope.login = function (user) {
        Location.login(user).then(function (success) {
            $state.go('location');
        }, function (error) {
            alert(error.data.msg);
        });
    }


    $scope.gotToSignUp = function () {
        $state.go('signup');
    }


});
