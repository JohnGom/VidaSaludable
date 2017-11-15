var gulp = require('gulp');
var gutil = require('gulp-util');
var swPrecache = require('sw-precache');
var swPrecacheConfig = require('./sw-config/sw-precache-config');
gulp.task('sw-build', function() {
  gulp.watch('./sw-config/sw-precache-config.js', ['sw-generate']);
});

gulp.task('sw-generate', ()=>{
   gutil.log("[build-sw] Detected service-worker change:");
   swPrecache.write(
       'dist/service-worker.js',
       swPrecacheConfig,
       () => {
          gulp.src('sw-config/sw-toolbox-config.js')
          .pipe(gulp.dest('dist'));
          gutil.log("[gulpfile] Task completed!:");
          gulp.src('sw-config/sw-toolbox-config.js')
         .pipe(gulp.dest('dist'));
          gulp.src('node_modules/sw-toolbox').pipe(gulp.dest('dist'));
          gutil.log("[gulpfile] Task completed!:");
       }
   );
});
