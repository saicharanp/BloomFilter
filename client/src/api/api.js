const Q = require('q');
const $ = require('jquery');

export const indexApi = () => {
    let deferred = Q.defer();
    $.ajax({
        type: "POST",
        url: "localhost:3001/bloomfilter/index",
        crossDomain: true,
        success: function() {
            deferred.resolve();
        },
        error: function(xhr) {
            deferred.reject(xhr.responseText);
        }
    });
    return deferred;
};