const Q = require('q');
const $ = require('jquery');

export const indexApi = () => {
    let deferred = Q.defer();
    $.ajax({
        type: "POST",
        url: "http://localhost:3001/bloomfilter/index",
        crossOrigin: true,
        success: function(data) {
            deferred.resolve(data);
        },
        error: function(xhr) {
            deferred.reject(xhr.responseText);
        }
    });
    return deferred.promise;
};

export const statusApi = () => {
    let deferred = Q.defer();
    $.ajax({
        type: "GET",
        url: "http://localhost:3001/bloomfilter/status",
        crossOrigin: true,
        success: function(data) {
            deferred.resolve(data);
        },
        error: function(xhr) {
            deferred.reject(xhr.responseText);
        }
    });
    return deferred.promise;
};

export const addWordApi = (word) => {
    let deferred = Q.defer();
    $.ajax({
        type: "POST",
        url: "http://localhost:3001/bloomfilter/add",
        data: {word: word},
        crossOrigin: true,
        success: function(data) {
            deferred.resolve(data);
        },
        error: function(xhr) {
            deferred.reject(xhr.responseText);
        }
    });
    return deferred.promise;
};

export const testWordApi = (word) => {
    let deferred = Q.defer();
    $.ajax({
        type: "POST",
        url: "http://localhost:3001/bloomfilter/test",
        data: {word: word},
        crossOrigin: true,
        success: function(data) {
            deferred.resolve(data);
        },
        error: function(xhr) {
            deferred.reject(xhr.responseText);
        }
    });
    return deferred.promise;
};