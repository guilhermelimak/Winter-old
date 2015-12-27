const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

var src = {
  globs: {
    html: ['./src/**/*.html'],
    sass: ['./src/scss/**/*.scss'],
    js: ['./src/js/**/*.js']
  },
  folder: './src/',
  sass: ['./src/scss/main.scss']
};

var dest = {
  globs: {
    all: ['./build/']
  },
  folder: './build/',
  css: './build/css',
  js: './build/js'
};

gulp.task('html', (done) => {
  gulp
  .src(src.globs.html)
  .pipe(gulp.dest(dest.folder))
  .on('end', done);
});

gulp.task('sass', (done) => {
  gulp
  .src(src.sass)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(dest.css))
  .on('end', done);
});

gulp.task('js', (done) => {
  gulp
  .src(src.globs.js)
  .pipe(gulp.dest(dest.js))
  .on('end', done);
});

gulp.task('watchers', () => {
  gulp.watch(src.globs.sass, ['sass']);
  gulp.watch(src.globs.html, ['html']);
  gulp.watch(src.globs.js, ['js']);
});

gulp.task('default', ['watchers', 'html', 'js', 'sass']);
