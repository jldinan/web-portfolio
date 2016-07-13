var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer');

//start browserSync server and setup watching scss/html files.
gulp.task('browser-sync',['sass'], function() {
    browserSync.init({
        server: "./app",
        open: 'external'
    });
    gulp.watch(['app/styles/*.scss', 'app/styles/components/*.scss'], ['sass']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

//compiles sass into CSS, concat, adds source-maps and auto-injects into browser.
gulp.task('sass', function() {
    return gulp.src(['app/styles/main.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', function(){this.emit('end');})
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(minifycss())
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/styles'))
        .pipe(browserSync.stream());
});
