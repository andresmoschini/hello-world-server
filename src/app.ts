import * as express from 'express';
import * as connect from 'connect';
import * as http from 'http';

// I do not have eyespect type definition
var inspect = require("eyespect").inspector();

export default function(port: number, listeningListener?: Function) {
  var app = express();
  app.all("*", (req, res) => {

    var output = "hello world\n";

    inspect("got request");
    inspect(req.headers, "req.headers");
    inspect(req.url, "req.url");
    inspect(req.body, "req.body");

    var body = "";

    if (req.method.toLowerCase() !== "post") {
      return res.end(output);
    }

    req.on("data", data => {
      body += data;
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
        req.connection.destroy();
      }
    });

    req.on("end", () => {
      inspect(body, "post body");
      res.end(output);
    });
  });

  var server = http.createServer(app);
  server.listen(port, listeningListener);
}
