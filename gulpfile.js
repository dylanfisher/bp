// Include gulp
var gulp = require('gulp');

// Include Plugins
var jshint     = require('gulp-jshint');
var sass       = require('gulp-sass');
// TODO: Add autoprefixer
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var connect    = require('gulp-connect');
var notify     = require('gulp-notify');
var del        = require('del');

// Lint Task
gulp.task('lint', function() {
  return gulp.src([
      'js/src/scripts/application.js',
      'js/src/scripts/**/*.js'
    ])
    .pipe(jshint())
    // Use gulp-notify as jshint reporter
    .pipe(notify(function(file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }

      var errors = file.jshint.results.map(function(data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }))
    .on('error', onError);
});

// Compile Sass
gulp.task('sass', function() {
  return gulp.src('css/sass/application.scss')
    .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(rename('application.min.css'))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload())
    .on('error', onError);
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src([
      'js/src/vendor/*.js',
      'js/src/vendor/**/*.js',
      'js/src/application.js',
      'js/src/scripts/*.js',
      'js/src/scripts/**/*.js',
    ], {
      allowEmpty: true
    })
    .pipe(concat('application.js'))
    .pipe(gulp.dest('js/dist'))
    .pipe(rename('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/dist'))
    .pipe(connect.reload())
    .on('error', onError);
});

// Livereload and web server
gulp.task('connect', function(done) {
  connect.server({
    livereload: true
  });
  done();
});

// Watch Files for Changes
gulp.task('watch', function(done) {
  gulp.watch('**/*.html', gulp.series(connect.reload));
  gulp.watch('js/src/**/*.js', gulp.series('lint', 'scripts'));
  gulp.watch('css/sass/**/*.scss', gulp.series('sass'));
  done();
});

// Clean up build files
gulp.task('clean', function () {
  return del([
    'css/build/**/*',
    'js/build/**/*'
  ]);
});

// Default Task
// gulp.task('default', ['lint', 'sass', 'scripts', 'clean', 'watch']);
gulp.task('default', gulp.series('lint', gulp.parallel('sass', 'scripts'), 'clean', 'connect', 'watch'));

// Catch errors
function onError(err) {
  console.log(err);
  this.emit('end');
}
