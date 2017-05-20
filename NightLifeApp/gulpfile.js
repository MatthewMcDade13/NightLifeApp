/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');

var paths = {  }

gulp.task('default', ['js']);

gulp.task('js', function () {
    return gulp.src(["wwwroot/lib/jquery/dist/jquery.min.js", "wwwroot/lib/tether/dist/js/tether.min.js", "wwwroot/lib/boostrap/dist/js/bootstrap.min.js",
                      "wwwroot/lib/angular/angular.min.js", "wwwroot/lib/angular-animate/angular-animate.min.js",
                      "wwwroot/lib/angular-modal-service/dst/angular-modal-service.min.js", "wwwroot/lib/angular-route/angular-route.min.js",
                      "wwwroot/app/app.js", "wwwroot/app/config.js", "wwwroot/app/directives/*.js",
                      "wwwroot/app/controllers/*.js", "wwwroot/app/services/*.js", "wwwroot/scripts/tooltips.js"])
        .pipe(ngAnnotate())
        .pipe(concat("scripts.js"))
        .pipe(gulp.dest("wwwroot/lib/app"))
        .pipe(uglify())
        .pipe(gulp.dest("wwwroot/lib/app"));
});