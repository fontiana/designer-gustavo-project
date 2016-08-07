var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('minifyJs', function () {
  gulp.src([
    'app/*.js',
    'app/modules/*.js',
    'app/modules/**/*.js'
  ])
    .pipe(concat('baseApp.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('copyFiles', function () {
  gulp.src([
    'app/*.html',
    'app/modules/**/*.html'
  ])
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyCSS', function () {
  gulp.src([
    'app/css/*.css'
  ])
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('app/*.js', ['minifyJs']);
  gulp.watch('app/modules/**/*.js', ['minifyJs']);
  gulp.watch('app/modules/**/*.html', ['copyFiles']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch("app/*.js").on('change', browserSync.reload);
    gulp.watch("app/modules/**/*.js").on('change', browserSync.reload);
    gulp.watch("app/modules/**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['minifyJs', 'copyFiles', 'minifyCSS', 'browser-sync', 'watch']);