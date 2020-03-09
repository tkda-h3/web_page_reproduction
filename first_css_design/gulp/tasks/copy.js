const gulp = require('gulp');
const copy = require('gulp-copy');
const config = require('../config.js'); // config.jsの読み込み

gulp.task('copy', function () {
    return gulp.src(config.src + '/**/*.js')
        .pipe(gulp.dest(config.build));
});
