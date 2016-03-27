var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss    = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function () {
    return gulp.src('src/mainPostCss.postcss')
        .pipe( sourcemaps.init() )
        .pipe( postcss([ require('autoprefixer'), require('postcss-advanced-variables'), require('precss') ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('build/styles/') );
});

gulp.task('watch', function() {
    gulp.src('src/**/*.postcss')
        .pipe(watch( 'src/**/*.postcss' , function() {
            gulp.start('css');
        }));
});

gulp.task('default', ['css', 'watch']);

