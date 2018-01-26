"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var uncaughtExceptionHandler = exports.uncaughtExceptionHandler = function uncaughtExceptionHandler(err) {
  console.log("uncaught exception: " + (err && err.stack || err));
  process.exit(1);
};

var onPossiblyUnhandledRejectionHandler = exports.onPossiblyUnhandledRejectionHandler = function onPossiblyUnhandledRejectionHandler(err) {
  console.log("Possibly unhandled bluebird exception: " + (err && err.stack || err));
};