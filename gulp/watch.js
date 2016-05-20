'use strict';

var gulp = require('gulp');

// modules for webserver and livereload

var express        = require('express');
var refresh        = require('gulp-livereload');
var livereload     = require('connect-livereload');

var livereloadport = 35729;
var serverport     = 4000;

// set up an express server

var server = express();

// add live reload

server.use(
  livereload({
    port: livereloadport
  })
);

// use our 'dist' folder as rootfolder

server.use(express.static('.'));
server.use(express.static('./src'));
server.use(express.static('./.tmp'));

// redirect everything back to index.html

server.all('/*', function(req, res) {
  res.sendFile('index.html', { root: 'src' });
});

gulp.task('watch', function() {
  server.listen(serverport);
  refresh.listen(livereloadport);

  gulp.watch(['./src/app/*.js', 'src/app/**/*.js']);
  gulp.watch(['./src/assets/stylesheets/**/*.scss'], ['styles']);
  gulp.watch('./dist/**').on('change', refresh.changed);
});
