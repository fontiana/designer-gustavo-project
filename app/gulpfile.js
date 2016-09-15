var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var path = require('path');
var eslint = require('gulp-eslint');

var webFolder = '../web';
var webImagesFolder = '../web/images';
var dirAplication = "./src";

gulp.task('static-analysis', function() {
  return gulp.src([path.join(dirAplication, "**/*.js"), ("!", path.join(webFolder, "**"))])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('minifyJs', function () {
  gulp.src([
    'src/*.js',
    'src/modules/*.js',
    'src/modules/**/*.js',
    'src/components/*.js',
    'src/components/**/*.js'
  ])
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('baseApp.min.js'))
    .pipe(uglify().on('error', function (e) {
      console.log(e.message);
    }))
    .pipe(gulp.dest(webFolder));
});

gulp.task('copyFiles', function () {
  gulp.src([
    'src/*.html',
    'src/modules/**/*.html'
  ])
    .pipe(gulp.dest(webFolder));
});

gulp.task('copyImages', function () {
  gulp.src([
    'src/images/*.png'
  ])
    .pipe(gulp.dest(webImagesFolder));
});


gulp.task('minifyCSS', function () {
  gulp.src([
    'src/css/*.css'
  ])
    .pipe(cleanCSS({ debug: true }, function (details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest(webFolder + '/css'));
});

gulp.task('minifyDependenciesJs', function () {
  gulp.src([
    'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
  ])
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('dependencies.js'))
    .pipe(uglify().on('error', function (e) {
      console.log(e.message);
    }))
    .pipe(gulp.dest(webFolder));
});

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['minifyJs']);
  gulp.watch('src/modules/**/*.js', ['minifyJs']);
  gulp.watch('src/*.html', ['copyFiles']);
  gulp.watch('src/modules/**/*.html', ['copyFiles']);
  gulp.watch('src/css/*.css', ['minifyCSS']);
});

gulp.task('default', ['minifyJs', 'minifyDependenciesJs', 'copyFiles', 'copyImages', 'minifyCSS', 'watch']);

// gulp.task('browser-sync', function () {
//   browserSync.init({
//     server: {
//       baseDir: webFolder
//     }
//   });
//   gulp.watch("dist/*.js").on('change', browserSync.reload);
//   gulp.watch("dist/*.html").on('change', browserSync.reload);
//   gulp.watch("dist/**/*.html").on('change', browserSync.reload);
//   gulp.watch("dist/css/*.css").on('change', browserSync.reload);
// });

// console.log("Local: " + e.cause.filename + " " + e.cause.col + ":" + e.cause.line + " Erro ao minificar css: " + e.cause.message, "\n");