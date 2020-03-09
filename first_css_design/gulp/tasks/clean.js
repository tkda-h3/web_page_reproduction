const gulp = require('gulp');
const del = require('del');
const config = require('../config.js'); // config.jsの読み込み

gulp.task('clean', function () {
    return del(config.build);
});
