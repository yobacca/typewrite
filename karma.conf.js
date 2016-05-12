module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    browsers: ['Firefox', 'Chrome', 'Safari'], // 'Chrome', 'Safari', 'Opera', 'IE'
    files: [
      'node_modules/mocha/mocha.js',
      'node_modules/chai/chai.js',
      'js/typewrite.js',
      'test/test.js'
    ],
    logLevel: config.LOG_INFO,
    port: 9877,
    preprocessors: {
      'js/typewrite.js': 'coverage'
    },
    reporters: ['progress', 'coverage']
  });
};