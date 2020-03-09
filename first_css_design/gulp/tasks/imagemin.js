let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let config = require('../config');

gulp.task('imagemin', function () {
   return gulp.src(config.src + '/**/*.{png,jpg,gif,svg}')
       .pipe(imagemin())
       .pipe(gulp.dest(config.build))
       ;
});