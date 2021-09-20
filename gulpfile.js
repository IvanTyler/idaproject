const gulp = require('gulp')
const less = require('gulp-less')
const watch = require('gulp-watch')

gulp.task('less-compile', () => {
    return gulp.src('./src/public/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./src/public/css/'))
})

gulp.task('watch', () => {
    gulp.watch('./src/public/less/**/*.less', gulp.series('less-compile'))
})