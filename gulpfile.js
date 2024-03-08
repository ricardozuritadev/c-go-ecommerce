const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

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

  gulp.watch('./scss/*.scss').on('change', reload);
  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./js/**/*.js').on('change', reload);
  gulp.watch('./js/**/*.js', gulp.series('js'));
});

gulp.task('css', () => {
  return gulp
    .src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', () => {
  return gulp
    .src('./js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', gulp.series('browser-sync'));

gulp.task('default', gulp.series('css', 'sass', 'js', 'watch'));
