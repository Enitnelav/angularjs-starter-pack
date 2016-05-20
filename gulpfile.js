'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('serve', ['clean', 'config', 'styles'], function() {
  gulp.start('watch');
  console.log('express web server is watching your files...');
});

gulp.task('build', ['clean', 'fonts', 'images', 'html', 'favicon']);
