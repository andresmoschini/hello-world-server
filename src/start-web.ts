#!/usr/bin/env node

import argv from "yargs";
import app from "./app"

var port = argv["port"] || process.env.PORT || 3000;

app(port, function (err, reply) {
  if (err) {
    throw err;
  }
  console.log("hello world server listening on port: %s", reply.port);
});
