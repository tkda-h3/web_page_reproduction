let gulp = require('gulp');
let kss = require('kss');
let config = require('../config.js'); // config.jsの読み込み

// kssのビルド設定
let kssConfig = {
    source: config.scss,
    homepage: '../styleguide/README.md',
    title: 'STYLE GUIDE',
    destination: config.build + '/styleguide/',
    css: '../assets/css/style.css',
    builder: config.styleguide
};

gulp.task('kss', function() {
    return kss(kssConfig);
});