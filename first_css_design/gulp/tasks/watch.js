let gulp = require('gulp');
let config = require('../config.js');

gulp.task('watch', function () {
    // scssファイルの変更祖監視しsassタスクを実行する
    gulp.watch(
        [config.src + '/**/*.scss', config.scss + '/**/*.scss'],
        gulp.series('sass', 'kss'),
    );
});