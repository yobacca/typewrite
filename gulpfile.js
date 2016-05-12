var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var Server = require('karma').Server;

// Compress js/typewrite.js and copy to js/typewrite.min.js.
gulp.task('compress', function() {
  gulp.src('js/typewrite.js')
    .pipe(uglify())
    .pipe(rename('typewrite.min.js'))
    .pipe(gulp.dest('js'))
});

// Execute Mocha/Chai tests once in several browsers using Karma
// and process code coverage recording using Istanbul.
gulp.task('test', function (done) {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      concurrency: 1
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    function (exitCode) {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Execute Mocha/Chai tests once in Chrome using Karma
// and process code coverage recording using Istanbul.
gulp.task('test:chrome', function (done) {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      browsers: ['Chrome']
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    function (exitCode) {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Execute Mocha/Chai tests once in Firefox using Karma
// and process code coverage recording using Istanbul.
gulp.task('test:firefox', function (done) {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      browsers: ['Firefox']
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    function (exitCode) {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Execute Mocha/Chai tests once in Safari using Karma
// and process code coverage recording using Istanbul.
gulp.task('test:safari', function (done) {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      browsers: ['Safari']
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    function (exitCode) {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Execute Mocha/Chai tests once in Opera using Karma
// and process code coverage recording using Istanbul.
gulp.task('test:opera', function (done) {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      browsers: ['opera']
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    function (exitCode) {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Execute Mocha/Chai tests once in Internet Explorer using Karma
// and process code coverage recording using Istanbul.
gulp.task('test:ie', function (done) {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      browsers: ['IE']
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    function (exitCode) {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Watch changes to js/typewrite.js or test/tests.js,
// execute Mocha/Chai tests immediately in Chrome using Karma
// and process code coverage recording using Istanbul.
gulp.task('tdd', function (done) {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: false,
      autoWatch: true,
      browsers: ['Chrome']
    },
    function () {
      done();
    }
  ).start();
});

// Default Task compress
gulp.task('default', ['compress']);