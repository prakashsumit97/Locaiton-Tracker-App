angular.module('LocationCtrl', []).controller('LocationController', function ($scope, Location, $state, $scope) {
    $scope.locationDetails = {};
    $scope.showDetails = false;
    var token = window.localStorage['token'];
    $scope.refreshSearch = function () {
        $scope.autocomplete = '';
        $scope.locationDetails = {};
        $scope.showDetails = false;
    }


    $scope.$on('gmPlacesAutocomplete::placeChanged', function () {
        var location = $scope.autocomplete.getPlace();
        $scope.showDetails = true;
        var data = {
            locationName: location.name,
            fullAddress: location.formatted_address,
            coordinates: {
                latitude: location.geometry.location.lat(),
                longitude: location.geometry.location.lng()
            }
        };
        $scope.locationDetails.locationName = location.name;
        $scope.locationDetails.fullAddress = location.formatted_address;
        $scope.locationDetails.latitude = location.geometry.location.lat();
        $scope.locationDetails.longitude = location.geometry.location.lng();
        Location.saveLocation(data).then(function (success) {
            console.log('Search Location Saved Successfully');
        }, function (error) {
            console.log(error.data);
        });

    });

});
