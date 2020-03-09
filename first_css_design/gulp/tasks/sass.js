const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const config = require('../config');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const cssdeclsort = require('css-declaration-sorter');
const mqpacker = require('css-mqpacker');
const csswring = require('csswring');

const options = require('minimist')(process.argv.slice(2), {string: 'env'});
const isProduction = (options.env === 'production');


gulp.task('sass', function () {
    return gulp.src(config.src + '/**/*.scss')
        .pipe(gulpif(!isProduction, sourcemaps.init()))
        .pipe(plumber(notify.onError('Error: \n<%= error.message %>')))
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(postcss([
            autoprefixer(),
            cssdeclsort({order: 'smacss'}),
        ]))
        .pipe(gulpif(isProduction, postcss([
            mqpacker(),
            csswring(),
            ])
        ))
        .pipe(gulpif(!isProduction, sourcemaps.write()))
        .pipe(gulp.dest(config.build))
});

