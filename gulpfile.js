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

  gulp.watch('./scss/*.scss').on('change', reload);
  gulp.watch('./scss/**/*.scss', gulp.series('css', 'css-unminified'));
  gulp.watch('./js/**/*.js').on('change', reload);
  gulp.watch('./js/**/*.js', gulp.series('js'));
});

gulp.task('css', () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError)) // Compila a CSS
    .pipe(cleanCSS({ compatibility: 'ie8' })) // Minifica el CSS
    .pipe(gulp.dest('./dist/css')) // Guarda el resultado en la carpeta ./dist/css
    .pipe(browserSync.stream()); // Recarga el navegador si se está ejecutando browserSync
});

gulp.task('css-unminified', () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError)) // Compila a CSS
    .pipe(gulp.dest('./css')) // Guarda el resultado en la carpeta ./css
    .pipe(browserSync.stream()); // Recarga el navegador si se está ejecutando browserSync
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
