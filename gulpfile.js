// grab our gulp packages
var gulp   = require('./node_modules/gulp'),
    gutil = require('./node_modules/gulp-util'),
    jshint = require('./node_modules/gulp-jshint'),
    sass   = require('./node_modules/gulp-sass');

// create a default task and just log a message
// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
    return gulp.src('source/javascript/!**!/!*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
    return gulp.src('css/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['jshint']);
    gulp.watch('css/scss/**/*.scss', ['build-css']);
});