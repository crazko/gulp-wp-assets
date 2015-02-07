gulp-wp-ass
===========

Simple gulp plugin. It creates manifes.json based on style.css. Another alternative to [grunt-wp-rev](https://github.com/raulghm/gulp-wp-rev) for [roots](https://github.com/roots/roots).

Still in learning process.

Usage
-----

Export to your 'node_modules' folder.

And add to your 'gulpfile.js':

```javascript
var wpAssets = require("gulp-wp-assets");

gulp.task('styles', function() {
  gulp.src('assets/css/style.min.css')
    .pipe(wpAssets({
      destination: 'assets/',
      cssHandle: 'roots_css',
      log: true
    }))
    .pipe(gulp.dest('assets/css'));
});
```
