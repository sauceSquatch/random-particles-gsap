var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var coffeeSources = ['scripts/*.coffee'],
    htmlSources = ['**/*.html'],
    sassSources = ['components/sass/*.+(scss|sass)'],
    jsSources = [
      'components/lib/jquery.min.js',
      'components/lib/greensock/TweenLite.js',
      'components/lib/greensock/TimelineMax.js',
      'components/lib/greensock/easing/EasePack.js',
      'components/lib/greensock/plugins/CSSPlugin.js',
      'components/lib/greensock/plugins/BezierPlugin.js',
      'components/lib/greensock/plugins/ThrowPropsPlugin.js',
      'components/lib/greensock/utils/Draggable.js',
      'components/scripts/main.js'
    ];

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('css'))
  .pipe(connect.reload())
});

gulp.task('js', function() {
  gulp.src(jsSources)
  // .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('js'))
  .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect:develop', function() {
  connect.server({
    root: '.',
    port: 3333,
    livereload: true
  })
});

gulp.task('connect:production', function() {
  connect.server({
    root: '.',
    port: process.env.PORT
  })
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('default', ['html', 'js', 'sass', 'connect:develop', 'watch']);
gulp.task('heroku:production', ['html', 'js', 'sass', 'connect:production']);

