var wpass = require('../');
var assert = require('assert');

describe('gulp-wp-assets', function() {
  describe('plugin()', function() {
    it('should throw, when arguments is missing', function () {
      (function () {
        wpass();
      }).should.throw('Name missing');
    });
  });
});
