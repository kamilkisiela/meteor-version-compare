var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build:meteor', function() {
    return gulp.src([
        './dist/version-compare.js',
        './src/meteor.js'
    ])
        .pipe(concat('meteor-version-compare.js'))
        .pipe(gulp.dest('./dist/'));
});