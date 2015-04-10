/* global require*/
'use strict';

// Include gulp
var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

// Define destination paths
var distPaths = {
    'dev': {
        'css': './public/css/dev',
        'js': './public/js/dev'
    },
    'prod': {
        'css': './public/css/prod',
        'js': './public/js/prod'
    }
};

// config for css auto-prefixer
var AUTOPREFIXER_BROWSERS = [
    'last 2 versions'
];

// Bower will find our JS and CSS and compile it
gulp.task('bowerJs', function(){
    gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.js'))
        .pipe(plugins.concat('vendor.js'))
        //.pipe(plugins.uglify())
        .pipe(gulp.dest(distPaths.prod.js));
});

gulp.task('styles', function () {
    return gulp.src('./public/css/dev/styles.scss')
        .pipe(plugins.sass({
            includePaths: require('node-neat')
            .with('/bower_components/bourbon/dist', '/bower_components/neat/app/assets/stylesheets')
        }))
        .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest(distPaths.prod.css));
});

gulp.task('default', ['bowerJs', 'styles']);
