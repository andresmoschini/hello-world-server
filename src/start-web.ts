import argv from "yargs";
import app from "./app"

var port = argv["port"] || process.env.PORT || 3000;

app(port);
