// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';

module.exports = function (Station) {
    Station.findData = function (params) {
        let filter = {}


        if (params.filter != null) {
            filter = params.filter
        }

        let result = Station.find(filter)

        if (params.count) {
            let finalData = {
                stations: [],
                totalCount: null
            }
            result = Station.count().then(res => {
                finalData.totalCount = res
                return Station.find(filter).then(res => {
                    finalData.stations = res
                    return finalData
                })
            })
        }


        return result
    };


    Station.remoteMethod('findData', {
        http: {
            path: "/findData",
            verb: "post"
        },
        accepts: [
            { arg: "params", type: "object", http: { source: "body" } }
        ],
        returns: {
            arg: "stations",
            type: "array",
        },
    });

    Station.createStations = function (obj) {
        return Station.create(obj)
    };


    Station.remoteMethod('createStations', {
        http: {
            path: "/createStations",
            verb: "post"
        },
        accepts: [
            { arg: "obj", type: "object", http: { source: "body" } }
        ],
        returns: {
            arg: "station",
            type: "object",
        },
    });
};
