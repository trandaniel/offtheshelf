var gulp = require('gulp') ;
var fs   = require('fs') ;

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
  require('./gulp/' + task);
});

gulp.task('run', ['run:server', 'default']);
gulp.task('compile', ['styles', 'scripts']) ;

//Watch task
gulp.task('default',function() {
    gulp.watch('styles/*.scss', ['compile']);
});
