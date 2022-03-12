// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';

const { error } = require('console');
const loopback = require('loopback');
const boot = require('loopback-boot');
const nodered = require('node-red');

const nodeRed = require('../node_modules/node-red/lib/red')
const app = module.exports = loopback();

app.start = function () {
  // start the web server
  let promise = null

  return app.listen(function () {
    app.emit('started');


    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);

    //Started
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);


      const promise = new Promise((resolve, reject) => {
        return runNodeRed()
      });

      return promise.then(r => {
      }).catch((e) => {
        throw new Error(e)
      })
    }
  });
};

const runNodeRed = () => {

  var http = require('http');
  var express = require("express");
  var RED = require("node-red");


  // Add a simple route for static content served from 'public'
  app.use("/", express.static("public"));

  // Create a server
  var server = http.createServer(app);

  // Create the settings object - see default settings.js file for other options
  var settings = {
    httpAdminRoot: "/red",
    httpNodeRoot: "/red",
    userDir: "/home/nol/.nodered/",
    functionGlobalContext: {}    // enables global context
  };

  // Initialise the runtime with a server and settings
  RED.init(server, settings);

  // Serve the editor UI from /red
  app.use(settings.httpAdminRoot, RED.httpAdmin);

  // Serve the http nodes UI from /api
  app.use(settings.httpNodeRoot, RED.httpNode);


  // Start the runtime
  RED.start();

}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});


