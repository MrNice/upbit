var gulp = require('gulp');

var stylus = require('gulp-stylus');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

var browserify = require('gulp-browserify');


gulp.task('stylus', function() {
    gulp.src('./assets/styles/styles.styl')
        .pipe(stylus({
            use: ['nib'],
            compress: false
        }))
        .pipe(rename("styles.css"))
        .pipe(gulp.dest('./.tmp/public/styles/'));
});

gulp.task('browserify', function() {
    gulp.src('./assets/js/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest('./.tmp/public/js/'));
});

gulp.task('copy', function() {
    gulp.src(['./assets/js/*.js', './assets/js/vendor/*.js'])
        .pipe(gulp.dest('./.tmp/public/js/'));

    gulp.src('./assets/favicon.ico')
        .pipe(gulp.dest('./.tmp/public/'));
    gulp.src('./assets/robots.txt')
        .pipe(gulp.dest('./.tmp/public/'));
    gulp.src('./assets/*.xml')
        .pipe(gulp.dest('./.tmp/public/'));

    gulp.src('./assets/styles/andada-*')
        .pipe(gulp.dest('./.tmp/public/styles/'));
});

gulp.task('copy-images', function() {
    gulp.src('./assets/images/*')
        .pipe(gulp.dest('./.tmp/public/images/'));
});


gulp.task('default', function() {
    gulp.run('stylus', 'browserify', 'copy', 'copy-images');

    gulp.watch('.assets/js/*.js', function() {
        gulp.run('browserify');
    });

    gulp.watch('./assets/images/*', function() {
        gulp.run('copy-images');
    });

    gulp.watch('./assets/styles/*.styl', function() {
        gulp.run('stylus');
    });
});