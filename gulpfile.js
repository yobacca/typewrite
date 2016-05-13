const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const mocha = require('gulp-mocha');
const Server = require('karma').Server;

// Compress js/typewrite.js and copy to js/typewrite.min.js.
gulp.task('compress', () => {
  gulp.src('js/typewrite.js')
    .pipe(uglify())
    .pipe(rename('typewrite.min.js'))
    .pipe(gulp.dest('js'))
});

// Execute Mocha/Chai tests once in several browsers using Karma
// and process code coverage recording using Istanbul.
gulp.task('test', (done) => {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      concurrency: 1
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    (exitCode) => {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Execute Mocha/Chai tests once in Chrome using Karma
// and process code coverage recording using Istanbul.
gulp.task('test:chrome', (done) => {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      browsers: ['Chrome']
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    (exitCode) => {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Execute Mocha/Chai tests once in Firefox using Karma
// and process code coverage recording using Istanbul.
gulp.task('test:firefox', (done) => {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      browsers: ['Firefox']
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    (exitCode) => {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Execute Mocha/Chai tests once in Safari using Karma
// and process code coverage recording using Istanbul.
gulp.task('test:safari', (done) => {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      browsers: ['Safari']
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    (exitCode) => {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Execute Mocha/Chai tests once in Opera using Karma
// and process code coverage recording using Istanbul.
gulp.task('test:opera', (done) => {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      browsers: ['opera']
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    (exitCode) => {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Execute Mocha/Chai tests once in Internet Explorer using Karma
// and process code coverage recording using Istanbul.
gulp.task('test:ie', (done) => {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      browsers: ['IE']
    },
    //done
    // Workaround for https://github.com/karma-runner/gulp-karma/issues/18
    // See also http://www.bendangelo.me/javascript/2015/11/14/simple-karma-task-for-gulp.html
    (exitCode) => {
      done();
      process.exit(exitCode);
    }
  ).start();
});

// Watch changes to js/typewrite.js or test/tests.js,
// execute Mocha/Chai tests immediately in Chrome using Karma
// and process code coverage recording using Istanbul.
gulp.task('tdd', (done) => {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: false,
      autoWatch: true,
      browsers: ['Chrome']
    },
    () => {
      done();
    }
  ).start();
});

// Default Task compress
gulp.task('default', ['compress']);