var gulp = require('gulp');
var gulpTypescript = require('gulp-typescript');
var tsconfig = gulpTypescript.createProject('src/tsconfig.json');
var del = require('del');
var gulpLess = require('gulp-less');
// var dist = 'C:/Apache24/htdocs/inv/';
var dist = './dist/';

gulp.task('clean', function () {
    return del([dist + '**']);
});

gulp.task('scripts', function () {
    var tsResult = tsconfig.src()
        .pipe(gulpTypescript(tsconfig));

    return tsResult.js.pipe(gulp.dest(dist));
});

gulp.task('less', function () {
    return gulp.src('./src/**/*.less')
        .pipe(gulpLess().on('error', function (err) {
            console.log(err);
        }))
        .pipe(gulp.dest(dist));
});

gulp.task('build', ['scripts', 'less'], function () {
    gulp.src(['./src/**/*.html', './src/**/*.js'])
        .pipe(gulp.dest(dist));
});