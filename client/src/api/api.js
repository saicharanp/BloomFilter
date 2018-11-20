const Q = require('q');
const $ = require('jquery');

export const indexApi = () => {
    let deferred = Q.defer();
    $.ajax({
        type: "POST",
        url: "http://localhost:3001/bloomfilter/index",
        crossOrigin: true,
        success: function() {
            deferred.resolve();
        },
        error: function(xhr) {
            deferred.reject(xhr.responseText);
        }
    });
    return deferred;
};