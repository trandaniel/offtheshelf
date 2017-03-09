var gulp = require('gulp') ;

var nodemon = require('gulp-nodemon') ;

gulp.task('run:server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['gulp*', 'assets*']
  });
});
