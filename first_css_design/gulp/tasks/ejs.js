const gulp = require('gulp');
const ejs = require('gulp-ejs');
const plumber = require('gulp-plumber');
const data = require('gulp-data');
const rename = require('gulp-rename');
const pages = require('../../assets/ejs/settings/_pages.json');
const config = require('../config.js'); // config.jsの読み込み
const minifyejs = require('gulp-minify-ejs');
const gulpif = require('gulp-if');
const envOption = { string: 'env' };
const options = require('minimist')(process.argv.slice(2), envOption);
const isProduction = (options.env === 'production');

gulp.task('ejs', () => {
    return gulp.src([config.src + '/**/*.ejs', '!' + config.src + '/**/_**/*.ejs', '!' + config.src + '/**/_*.ejs'])
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(data(function (file) {
            if (file.path.length !== 0) {
                let path = file.path.split('¥').join('/');
                path = path.split('\\').join('/');
                let filename = path.split('src/')[1].replace('.ejs', '');
                return {
                    metadata: pages[filename]
                }
            }
        }))
        .pipe(ejs())
        .pipe(rename({ extname: '.html' }))
        .pipe(gulpif(isProduction, minifyejs()))
        .pipe(gulp.dest(config.build));
});
