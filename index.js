// 'use strict';

var through = require('through2');
var util = require('gulp-util');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var PluginError = util.PluginError;

const PLUGIN_NAME = 'gulp-wp-assets';

function errorMessage(message) {
  throw new PluginError(PLUGIN_NAME, message);
}

function md5(str, lngth) {
  lngth = lngth || 10;
  return crypto.createHash('md5').update(str).digest('hex').slice(0, lngth);
}

function writeLog(log, message) {
  if (log) {
    util.log(message);
  }
}

function writeManifest(filename, data) {
  fs.writeFile(filename, JSON.stringify(data, null, 2), function (error) {
    if (error) {
      throw error;
    }
  });
}

module.exports = function(options) {

  var manifest = {};
  var options = options || {};

  if (!options.destination) {
    errorMessage('Destination is missing.');
  }

  options.cssHandle = options.cssHandle || 'roots_css';
  manifest.dest = options.destination + 'manifest.json';

  return through.obj(function(file, enc, callback) {

    if (file.isNull()) {
      callback(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported.'));
      return callback();
    }

    var filename = path.basename(file.path);

    if (file.isBuffer()) {
      var summary = {};

      summary.path = options.destination + 'css/' + filename;
      summary.hash = md5(file.contents);
      summary.handle = options.cssHandle;

      manifest[summary.path] = summary;
    }

    writeManifest(manifest.dest, manifest);
    writeLog(options.log, 'Manifest file was added to ' + manifest.dest);

    callback(null, file);

  });

};
