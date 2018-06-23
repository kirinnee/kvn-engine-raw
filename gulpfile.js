/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var rename = require("gulp-rename");
const babel = require('gulp-babel');
const del = require('del');

gulp.task('clean',function(){
   return del(['patch']);
});

gulp.task('export1', function () {
    return gulp.src(
            ['public_html/**/*.*'
                        , '!public_html/js/**/*.*'
                        , '!public_html/kvn/backend/**/*.*'
                        , '!public_html/kvn/images/bkgd/**/*.*'
                        , '!public_html/kvn/images/char/**/*.*'
                        , '!public_html/kvn/scripts/**/*.*'
                        , '!public_html/kvn/sound/**/*.*'
                        , '!public_html/kvn/config.js'
                        , '!public_html/kvn/config_def.js'
            ])
            .pipe(gulp.dest(['export']));
});

gulp.task('export2', function () {
    var a = new Promise(function (resolve) {
        gulp.src(['public_html/js/**/*.*']).pipe(babel({
            presets: ['env']
        })).pipe(gulp.dest(['export/js'])).on('end', function () {
            resolve();
        });;
    });
    var b = new Promise(function(resolve){
        gulp.src(['public_html/kvn/backend/**/*.*']).pipe(babel({
        presets: ['env']
    })).pipe(gulp.dest(['export/kvn/backend'])).on('end', function () {
            resolve();
        });;
    });
    var c = new Promise(function(resolve){
        gulp.src(['public_html/kvn/scripts/di.js'])
            .pipe(rename(function (path) {
                path.basename = "init";
            }))
            .pipe(gulp.dest(['export/kvn/scripts'])).on('end', function () {
            resolve();
        });;
    });
    var e = new Promise(function(resolve){
        gulp.src(['public_html/kvn/config_def.js'])
            .pipe(rename(function (path) {
                path.basename = "config";
            }))
            .pipe(gulp.dest(['export/kvn/'])).on('end', function () {
            resolve();
        });;
    });
    var d = new Promise(function(resolve){
       gulp.src(['*.*'],{read:false})
               .pipe(gulp.dest('export/kvn/sound'))
               .pipe(gulp.dest('export/kvn/images/char'))
               .pipe(gulp.dest('export/kvn/images/bkgd')).on('end', function () {
            resolve();
        });
    });

    return Promise.all([a, b, c,d,e]);
});

gulp.task('patch', function () {
    var a = new Promise(function (resolve) {

        gulp.src(
                ['export/css/**/*.*'
                            , '!export/css/config.css'
                ]).pipe(gulp.dest(['patch/css'])).on('end', function () {
            resolve();
        });
        ;
    });
    var b = new Promise(function (resolve) {
        gulp.src(
                ['export/kvn/**/*.*'
                            , '!export/kvn/images'
                            , '!export/kvn/scripts'
                            , '!export/kvn/sound'
                            , '!export/kvn/config.js'])
                .pipe(gulp.dest(['patch/kvn'])).on('end', function () {
            resolve();
        });
    })

    return Promise.all([a, b]);
});


gulp.task('default', gulp.series('clean','export1', 'export2', 'patch'));
