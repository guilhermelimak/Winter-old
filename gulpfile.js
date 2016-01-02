const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const concat = require('gulp-concat');

const src = {
  globs: {
    html: ['./src/**/*.html'],
    sass: ['./src/scss/**/*.scss'],
    js: ['./src/js/**/*.js']
  },
  folder: './src/',
  sass: ['./src/scss/main.scss'],
  js: [
    './bower_components/angular/angular.js',
    './bower_components/angular-bootstrap/ui-bootstrap.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    './bower_components/angular-hotkeys/build/hotkeys.js',
    './bower_components/angular-route/angular-route.js',
    './src/js/app.module.js',
    './src/js/app.config.js',
    './src/js/services/twitter.service.js',
    './src/js/controllers/main.controller.js',
    './src/js/controllers/timeline.controller.js',
    './src/js/controllers/reply.modal.controller.js'
  ],
  fonts: './bower_components/font-awesome/fonts/**'
};

const dest = {
  globs: {
    all: ['./build/']
  },
  folder: './build/',
  css: './build/css',
  js: './build/js',
  fonts: './build/fonts'
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
  .src(src.js)
  .pipe(concat('app.js'))
  .pipe(gulp.dest(dest.js))
  .on('end', done);
});

gulp.task('fonts', (done) => {
  gulp
  .src(src.fonts)
  .pipe(gulp.dest(dest.fonts))
  .on('end', done);
});

gulp.task('watchers', () => {
  gulp.watch(src.globs.sass, ['sass']);
  gulp.watch(src.globs.html, ['html']);
  gulp.watch(src.globs.js, ['js']);
});

gulp.task('default', ['watchers', 'build']);

gulp.task('build', ['html', 'js', 'sass', 'fonts']);
