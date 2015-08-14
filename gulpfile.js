'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var Builder = require('systemjs-builder');
var sourcemaps = require('gulp-sourcemaps');
var flatten = require('gulp-flatten');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');

var path = {
  public: {
    _: 'public/',
    js: 'public/app.js',
    fonts: 'public/fonts'
  },
  src: {
    _: 'public_src/',
    sass: 'public_src/main.sass',
    js: 'public_src/showcase',
    html: 'public_src/**/*.html'
  },
  fonts: '**/*.{ttf,woff,woff2,eof,svg}'
};

gulp.task('sass', function() {
  if (process.env.NODE_ENV === 'production') {
    gulp.src(path.src.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.public._));
  } else {
    gulp.src(path.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.public._));
  }
});

gulp.task('html', function() {

  gulp.src(path.src.html)
  .pipe(minifyHtml({
    empty: true,
    spare: true,
    quotes: true
  }))
  .pipe(ngHtml2Js({
    moduleName: 'showcaseTemplates'
  }))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest(path.public._));

  gulp.src(path.src._ + 'index.html')
  .pipe(gulp.dest(path.public._));
});

gulp.task('js', function() {
  var b = new Builder();
  var buildConfig = {
    sourceMaps: true,
    lowResSourceMaps: true
  };

  if (process.env.NODE_ENV === 'production') {
    buildConfig.minify = true;
    console.log('Minifying js');
  }

  b.loadConfig('./config.js')
  .then(function() {
    b.buildSFX(path.src.js, path.public.js, buildConfig)
    .then(function() {
      console.log('Javascript built');
    })
    .catch(function(error) {
      console.log(error);
    });
  })
  .catch(function(error) {
    console.log(error);
  });
});

gulp.task('fonts', function() {
  gulp.src(path.fonts)
  .pipe(flatten())
  .pipe(gulp.dest(path.public.fonts));
});

gulp.task('build', ['sass', 'html', 'js', 'fonts'], function() {});

gulp.task('watch', ['build'], function() {
  gulp.watch(path.src._ + '**/*', ['sass', 'html', 'js']);
});
