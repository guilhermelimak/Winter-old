const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const src = {
  globs: {
    html: ['./src/**/*.html'],
    sass: ['./src/scss/**/*.scss'],
    js: ['./src/js/**/*.js'],
    modules: ['./src/js/modules/**/*.js']
  },
  folder: './src/',
  sass: ['./src/scss/main.scss'],
  js: [
    './bower_components/angular/angular.js',
    './bower_components/angular-bootstrap/ui-bootstrap.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    './bower_components/angular-hotkeys/build/hotkeys.js',
    './bower_components/angular-route/angular-route.js',
    './bower_components/angular-sanitize/angular-sanitize.js',
    './src/js/app.globals.js',
    './src/js/app.module.js',
    './src/js/app.config.js',
    './src/js/services/user-storage.service.js',
    './src/js/services/twitter.service.js',
    './src/js/services/regex-helper.service.js',
    './src/js/services/modal.service.js',
    './src/js/services/hotkey.registry.service.js',
    './src/js/controllers/login.controller.js',
    './src/js/controllers/timeline.controller.js',
    './src/js/controllers/reply.modal.controller.js',
    './src/js/controllers/profile.modal.controller.js',
    './src/js/controllers/new-tweet.modal.controller.js',
    './src/js/controllers/picture.modal.controller.js',
    './src/js/controllers/navbar.controller.js'
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
  modules: './build/js/modules',
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

gulp.task('modules', (done) => {
  gulp
  .src(src.globs.modules)
  .pipe(gulp.dest(dest.modules))
  .on('end', done);
});

gulp.task('watchers', () => {
  gulp.watch(src.globs.sass, ['sass']);
  gulp.watch(src.globs.html, ['html']);
  gulp.watch(src.globs.js, ['js']);
  gulp.watch(src.globs.modules, ['modules']);
});

gulp.task('default', ['watchers', 'build']);

gulp.task('build', ['html', 'js', 'modules', 'sass', 'fonts']);
