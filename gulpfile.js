const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('browser-sync', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./styles/*.scss').on('change', reload);
  gulp.watch('./styles/**/*.scss', gulp.series('css', 'css-unminified'));
  gulp.watch('./js/**/*.js').on('change', reload);
  gulp.watch('./js/**/*.js', gulp.series('js'));
});

gulp.task('css', () => {
  return gulp
    .src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('css-unminified', () => {
  return gulp
    .src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp
    .src('./js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream()); // Recarga el navegador si se está ejecutando browserSync
});

gulp.task('watch', gulp.series('browser-sync'));

gulp.task('default', gulp.series('css', 'css-unminified', 'js', 'watch'));
