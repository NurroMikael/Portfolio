// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';

module.exports = function (Product) {
  Product.getProducts = function (filter) {
    let result = {
      data: [],
      totalCount: 0
    }


    return Product.count().then(count => {
      result.totalCount = count
      return Product.find(filter)
    }).then(res => {
      result.data = res
      return result
    })
  };


  Product.remoteMethod('getProducts', {
    http: {
      path: "/getProducts",
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



  Product.createProduct = function (obj) {
    return Product.create(obj)
  };

  Product.remoteMethod('createProduct', {
    http: {
      path: "/createProduct",
      verb: "post"
    },
    accepts: [
      { arg: "obj", type: "object", http: { source: "body" } }
    ],
    returns: {
      arg: "product",
      type: "object",
    },
  });


  Product.findData = function (params) {

    let filter = {}

    if (params.filter != null) {
      filter = params.filter
    }

    return Product.find(filter)

  };


  Product.remoteMethod('findData', {
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


  Product.updateProduct = function (object) {
    let id = object.id
    let obj = object.obj


    return Product.findById(id).then(res => {

      if (res.id != null) {
        let result = {
          ...res,
          ...obj
        }

        let filter = {
          where: {
            id: res.id
          }
        }

        return Product.replaceById(res.id, result)
      }
    })
    /*return Product.findById(id).then(res => {

      console.log(res)
      if (res != null) {

        let result = {
          ...res,
          ...obj
        }

        let filter = {
          where: {
            id: id
          }
        }

        return Product.update(filter, result)
      }
      return Promise.resolve("Not found by id")
    })*/

  };


  Product.remoteMethod('updateProduct', {
    http: {
      path: "/updateProduct",
      verb: "post"
    },
    accepts: [
      { arg: "object", type: "object", http: { source: "body" } }
    ],
    returns: {
      arg: "product",
      type: "object",
    },
  });
};
