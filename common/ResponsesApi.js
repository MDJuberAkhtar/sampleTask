'use strict';

const Responses = {
    _Success(data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: data['status'] ? data['status'] : 200,
            body: JSON.stringify(data),
        };
    },

    _Error(data = {}) {
        console.log('error:data::', data);
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: data['status'] ? data['status'] : 404,
            body: JSON.stringify(data),
        };
    },
};

module.exports = Responses;