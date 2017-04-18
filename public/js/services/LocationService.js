angular.module('LocationService', []).factory('Location', ['$http', '$q', function ($http, $q) {

    var Location = {};

    Location.login = function (data) {
        var deferred = $q.defer();
        $http.post('/api/login', data).then(function (sData) {
            if (sData) {
                window.localStorage['token'] = angular.toJson(sData.data.token);
                deferred.resolve(sData);
            } else {
                deferred.resolve();
            }
        }, function (eData) {
            deferred.reject(eData);
        });
        return deferred.promise;
    }


    Location.saveLocation = function (data) {
        var deferred = $q.defer();
        $http.post('/api/saveLocation', data, {
            withCredentials: true,
            headers: {
                'Authorization': window.localStorage['token']
            }
        }).then(function (sData) {
            if (sData) {
                deferred.resolve(sData);
            } else {
                deferred.resolve();
            }
        }, function (eData) {
            deferred.reject(eData);
        });
        return deferred.promise;
    };


    Location.getSessionUser = function (data) {
        var deferred = $q.defer();
        $http.get('/api/getSessionUser').then(function (sData) {
            if (sData) {
                deferred.resolve(sData);
            } else {
                deferred.resolve();
            }
        }, function (eData) {
            deferred.reject(eData);
        });
        return deferred.promise;
    };

    Location.logout = function (data) {
        var deferred = $q.defer();
        $http.get('/api/logout').then(function (sData) {
            if (sData) {
                deferred.resolve(sData);
            } else {
                deferred.resolve();
            }
        }, function (eData) {
            deferred.reject(eData);
        });
        return deferred.promise;
    };

    Location.getAllSearches = function (data) {
        var deferred = $q.defer();
        $http.get('/api/getAllSearches', {
            withCredentials: true,
            headers: {
                'Authorization': window.localStorage['token']
            }
        }).then(function (sData) {
            if (sData) {
                deferred.resolve(sData.data);
            } else {
                deferred.resolve();
            }
        }, function (eData) {
            deferred.reject(eData);
        });
        return deferred.promise;
    };


    Location.signup = function (data) {
        var deferred = $q.defer();
        $http.post('/api/signup', data).then(function (sData) {
            if (sData) {
                deferred.resolve(sData.data);
            } else {
                deferred.resolve();
            }
        }, function (eData) {
            deferred.reject(eData);
        });
        return deferred.promise;
    };
    return Location;

}]);
