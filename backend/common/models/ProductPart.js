// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';

module.exports = function (ProductPart) {

    ProductPart.findData = function (params) {

        let filter = {}

        if (params.filter != null) {
            filter = params.filter
        }

        return ProductPart.find(filter)

    };


    ProductPart.remoteMethod('findData', {
        http: {
            path: "/findData",
            verb: "post"
        },
        accepts: [
            { arg: "params", type: "object", http: { source: "body" } }
        ],
        returns: {
            arg: "productParts",
            type: "array",
        },
    });

    ProductPart.createProductPart = function (obj) {
        return ProductPart.create(obj)
    };


    ProductPart.remoteMethod('createProductPart', {
        http: {
            path: "/createProductPart",
            verb: "post"
        },
        accepts: [
            { arg: "obj", type: "object", http: { source: "body" } }
        ],
        returns: {
            arg: "productPart",
            type: "object",
        },
    });



};
