"use strict";

var argv = require('minimist')(process.argv.slice(2))
var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('gulp-browserify2');
var reactify = require('reactify');
var server = require('gulp-express');
var sass = require('gulp-sass');
var resetCSS = require('node-reset-scss').includePath;
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imagemin = require('gulp');


gulp.task('js', function(){
    gulp.src("./views/app.jsx")
        .pipe(browserify({
            filename : "main.js",
            transform: [babelify, reactify],
            options: {
                extensions : [".jsx"]
            }
        }))
        .pipe(gulp.dest("./public/"))
        .pipe(server.notify());
});

gulp.task("server", function(){
    server.run(["server.js"]);
    gulp.watch([
        "./server.js",
        "./server/*",
        "./public/js/*",
        "./views/**/*",
        "./views/*"
    ], ["server"]);
});

gulp.task('sass', function(){
    gulp.src('./sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: argv.production ? 'compressed' : undefined,
            sourceMap : argv.production ? undefined : true,
            includePaths: [resetCSS]
        }))

        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

gulp.task("watch", ["js"], function(){
    gulp.watch(["./views/**/*", "./views/*"], ["js"]);
    gulp.watch(['./sass/*, ./sass/**/*'], ['sass']);
    gulp.watch(['./images/*'], 'imagemin');
});

gulp.task("imagemin", function(){
    gulp.src('./images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./public/images'));
});

gulp.task("build", ['imagemin'], function(){


    gulp.src('./sass/main.scss')
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
            includePaths: [resetCSS]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public'));

    gulp.src("./views/app.jsx")
        .pipe(browserify({
            filename : "main.js",
            transform: [babelify, reactify],
            options: {
                extensions : [".jsx"]
            }
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./public/"))
});


gulp.task("default", ["watch", "server", "sass"]);

module.exports = gulp;
