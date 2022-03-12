// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';


module.exports = async function (app) {

  let products = [
    {
      name: 'Samsung a55 mobile',
      type: 'device',
    },
    {
      name: 'Mac-book laptop',
      type: 'device',
    },
    {
      name: 'Audi A4',
      type: 'vehicle',
    },
    {
      name: 'Lamp',
      type: 'accessory',
    },
    {
      name: 'BMW S',
      type: 'vehicle',
    },
    {
      name: 'Mercedes-Benz S',
      type: 'vehicle',
    },
  ]

  let stations = [{
    name: "Programming"
  }, {
    name: "Electric"
  }, {
    name: "Welding"
  }, {
    name: "Grinding"
  }, {
    name: "Finishing"
  }, {
    name: "Painting"
  }]

  const { User, Role, RoleMapping, AccessToken, Product, Work, ProductPart, Station } = app.models
  const ds = app.dataSources.mysqlDs

  var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', "Product", "Work", "ProductPart", "Station"];


  const createRoles = () => {
    return Role.create({ name: 'admin' }), Role.create({ name: 'user' })
  }

  const createUsers = () => {
    return User.create([
      {
        "firstName": 'Admin',
        "lastName": "Jokunen",
        "email": "Jaska.Admin@gmail.com"
      },
      {
        "firstName": 'User',
        "lastName": "Jokunen",
        "email": "Jaska.User@gmail.com"
      }]).then(res => {
        return createRoleMapping(res)
      })
  }

  const createRoleMapping = (res) => {
    let admin = res[0]
    let user = res[1]

    let promises = []

    promises.push(RoleMapping.create({
      principalType: "Admin",
      principalId: admin.id,
      roleId: 1,
    }),
      RoleMapping.create({
        principalType: "User",
        principalId: user.id,
        roleId: 2,
      }))

    return Promise.all(promises)
  }

  const createProducts = () => {
    return Product.create(products)
  }

  const createStations = () => {
    return Station.create(stations)
  }




  return ds.autoupdate(lbTables).then(res => {

    return Role.findById(1)
  }).then(res => {
    return res == null ? createRoles() : Promise.resolve("Find users")
  }).then(res => {

    return User.findById(1)
  }).then(res => {
    return res == null ? createUsers() : Promise.resolve('Users already created,')
  }).then(res => {
    return Product.findById(1)
  }).then(res => {
    return res == null ? createProducts() : Promise.resolve('Already created products')
  }).then(res => {
    return Station.findById(1)
  }).then(res => {
    return res == null ? createStations() : Promise.resolve('Already created Stations')
  }).catch((e) => {
    console.log('error', e)
  })

};
