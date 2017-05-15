var gulp = require('gulp');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var through = require('through2');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');

var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 4 versions"] });

function move_header (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(createError(file, 'Streaming not supported', null));
    }

	var licenses = [];
	var withoutLicense = String(file.contents).replace(/\s+(\/\*\!.+?\*\/)\s+/g, function (z, license) {
		licenses.push(license);
		return '';
	});
	
	if (licenses.length > 0) {
		licenses.push('');
	}
	
	file.contents = new Buffer(licenses.join('\n') + withoutLicense);
	
	cb(null, file);
}

gulp.task('watch', function() {
    gulp.watch('./**/*.less', ['build', 'minify']);
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
		.pipe(through.obj(move_header))
        .pipe(gulp.dest('./assets'));
    gulp.src('./src/js/**/*.js')
        .pipe(uglify({
			preserveComments: 'license',
			properties: {
				regex: /^m_/
			}
		}))
        .pipe(concat('affinity.js'))
        .pipe(rename({
            suffix: '.min'
        }))
		.pipe(through.obj(move_header))
        .pipe(gulp.dest('./assets'));
});

gulp.task('default', ['build']);
