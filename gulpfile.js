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

function PreserveLicense() {}
PreserveLicense.prototype = {
  save: function () {
    var self = this;
    return function (file, enc, cb) {
      if (file.isNull()) {
        return cb(null, file);
      }

      if (file.isStream()) {
        return cb(createError(file, 'Streaming not supported', null));
      }

      self.licenses = [];
      String(file.contents).replace(/\s*(\/\*\!.+?\*\/)\s*/g, function (z, license) {
        self.licenses.push(license);
      });

      cb(null, file);
    }
  },

  restore: function () {
    var self = this;
    return function (file, enc, cb) {
      if (file.isNull()) {
        return cb(null, file);
      }

      if (file.isStream()) {
        return cb(createError(file, 'Streaming not supported', null));
      }

      if (self.licenses.length > 0) {
        self.licenses.push('');
      }

      file.contents = new Buffer(self.licenses.join('\n') + String(file.contents));

      cb(null, file);
    }
  }
};

var assetsDir = './affinity/assets';

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
    var cssLicense = new PreserveLicense();
    gulp.src('./src/css/*.css')
        .pipe(concat('affinity.css'))
        .pipe(through.obj(cssLicense.save()))
        .pipe(cleancss())
        .pipe(through.obj(cssLicense.restore()))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(assetsDir));

    var jsLicense = new PreserveLicense();
    var mangleProperties = {
      regex: /^m_/
    };
    gulp.src([
    			'./src/js/lib/*.js',
    			'./src/js/init.js',
    			'./src/js/app/*.js',
    		])
        .pipe(concat('affinity.js'))
        .pipe(through.obj(jsLicense.save()))
        .pipe(uglify({
          mangle: {
            properties: mangleProperties
          },
          mangleProperties: mangleProperties
        }))
        .pipe(through.obj(jsLicense.restore()))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(assetsDir));
});

gulp.task('default', ['build']);
