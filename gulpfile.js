var gulp = require('gulp');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');

var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 4 versions"] });

gulp.task('watch', function() {
    gulp.watch('./**/*.less', ['build']);
});

gulp.task('build', function() {
    gulp.src('./src/less/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(csscomb())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('minify', function() {
    gulp.src('./src/css/*.css')
        .pipe(concat('affinity.css'))
        .pipe(cleancss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets'));
    gulp.src('./src/js/*.js')
        .pipe(concat('affinity.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets'));
});

gulp.task('default', ['build']);
