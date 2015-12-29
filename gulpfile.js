const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('gulp-browserify');
const del = require('del');

const src = {
  globs: {
    html: ['./src/**/*.html'],
    sass: ['./src/scss/**/*.scss'],
    js: ['./src/js/**/*.js']
  },
  folder: './src/',
  sass: ['./src/scss/main.scss'],
  browserify: './src/js/app.browserify.js'
};

const dest = {
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
  .src(src.browserify)
  .pipe(browserify())
  .pipe(gulp.dest(dest.js))
  .on('end', done);
});

gulp.task('watchers', () => {
  gulp.watch(src.globs.sass, ['sass']);
  gulp.watch(src.globs.html, ['html']);
  gulp.watch(src.globs.js, ['js']);
});

gulp.task('default', ['watchers', 'html', 'js', 'sass']);
