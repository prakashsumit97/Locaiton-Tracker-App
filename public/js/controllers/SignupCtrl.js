angular.module('SignupCtrl', []).controller('SignupController', function ($scope, Location, $state, $timeout) {
    $scope.successMsg = '';
    $scope.errorMsg = '';
    $scope.signup = function (userData, valid) {
        Location.signup(userData).then(function (success) {
            $scope.successMsg = 'User is Successfully Created'
            $timeout(function () {
                $scope.successMsg = ''
            }, 3000);

        }, function (error) {
            $scope.errorMsg = 'User is already registered with this Email Id Please Login';
//            $timeout(function () {
             //                $scope.errorMsg = ''
             //            }, 3000);
        });
    }
});
