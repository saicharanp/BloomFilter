const Q = require('q');
const $ = require('jquery');
const _ = require('lodash');

export const indexApi = () => {
    return ajaxApi('POST', 'http://localhost:3001/bloomfilter/index', undefined);
};

export const statusApi = () => {
    return ajaxApi('GET', 'http://localhost:3001/bloomfilter/status', undefined);
};

export const addWordApi = (word) => {
    return ajaxApi('POST', 'http://localhost:3001/bloomfilter/add', {word: word});
};

export const testWordApi = (word) => {
    return ajaxApi('POST', 'http://localhost:3001/bloomfilter/test', {word: word});
};

const ajaxApi = (type, url, data) => {
    let deferred = Q.defer();
    $.ajax(getRequest(type, url, data, deferred));
    return deferred.promise;
}

const getRequest = (type, url, data, deferred) => {
    const request = {
        type: type,
        url: url,
        crossOrigin: true,
        success: function(data) {
            deferred.resolve(data);
        },
        error: function(xhr) {
            deferred.reject(xhr.responseText);
        }
    };
    if(!_.isNil(data)) {
        return _.extend(request, {data: data});
    }
    return request;
}