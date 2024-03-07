const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('sass', function () {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('js', function () {
  return gulp
    .src('./js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('sass', 'js', 'watch'));
