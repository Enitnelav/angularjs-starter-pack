'use strict';

var gulp       = require('gulp');
var ngConstant = require('gulp-ng-constant');
var rename     = require('gulp-rename');
var env        = require('gulp-env');
var fs         = require('fs');

var configTemplate = "\
import angular from 'angular';\n\n\
export var <%- moduleName %> = angular.module('<%- moduleName %>'<% if (deps) { %>, <%= JSON.stringify(deps) %><% } %>)\
<% constants.forEach(function(constant) { %>\
\n.constant('<%- constant.name %>', <%= constant.value %>)\
<% }) %>;\
";

gulp.task('env', function() {
  var envFile = '.env.json';

  if (fs.existsSync(envFile)) {
    env({ file: envFile });
  }
});

gulp.task('config', ['env'], function() {
  return gulp
    .src('./src/config/config.json')
    .pipe(
      ngConstant({
        name: 'configModule',
        template: configTemplate,
        space: '  ',
        constants: {
          CONFIG: {
            API_URL: process.env.API_URL,
            API_VERSION: process.env.API_VERSION,
            ENV: process.env.ENV
          }
        }
      })
    )
    .pipe(rename('config.js'))
    .pipe(gulp.dest('./src/app/'));
});
