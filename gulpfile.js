const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

var src = {
  globs: {
    html: ['./src/**/*.html']
  },
  folder: './src/',
  sass: ['./src/scss/main.scss']
};

var dest = {
  globs: {
    all: ['./build/']
  },
  folder: './build/',
  css: './build/css'
};

gulp.task('copy', (done) => {
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

gulp.task('watchers', () => {
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.globs.html, ['copy']);
});

gulp.task('default', ['watchers', 'copy', 'sass']);
