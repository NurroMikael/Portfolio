// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';

module.exports = function (Work) {


    Work.getWorks = function (filter) {
        let result = {
            data: [],
            totalCount: 0
        }


        return Work.count().then(count => {
            result.totalCount = count
            return Work.find(filter)
        }).then(res => {
            result.data = res
            return result
        })
    };


    Work.remoteMethod('getWorks', {
        http: {
            path: "/getWorks",
            verb: "post"
        },
        accepts: [
            { arg: "filter", type: "object", http: { source: "body" } }
        ],
        returns: {
            arg: "result",
            type: "object",
        },
        description: "Return table object "
    });


    Work.findData = function (params) {

        let filter = {}

        if (params.filter != null) {
            filter = params.filter
        }

        return Work.find(filter)
    };


    Work.remoteMethod('findData', {
        http: {
            path: "/findData",
            verb: "post"
        },
        accepts: [
            { arg: "params", type: "object", http: { source: "body" } }
        ],
        returns: {
            arg: "works",
            type: "array",
        },
    });


    Work.createWork = function (obj) {
        return Work.create(obj)
    };


    Work.remoteMethod('createWork', {
        http: {
            path: "/createWork",
            verb: "post"
        },
        accepts: [
            { arg: "obj", type: "object", http: { source: "body" } }
        ],
        returns: {
            arg: "work",
            type: "object",
        },
    });

    Work.updateWorkById = function (object) {
        let id = object.id
        let obj = object.obj

        return Work.findById(id).then(res => {

            let result = {
                ...res,
                ...obj
            }


            return Work.replaceById(res.id, result)
        }).then(res => {
            return Work.findById(id)
        })
    };


    Work.remoteMethod('updateWorkById', {
        http: {
            path: "/updateWorkById",
            verb: "post"
        },
        accepts: [
            { arg: "object", type: "object", http: { source: "body" } }
        ],
        returns: {
            arg: "work",
            type: "object",
        },
    });
};
