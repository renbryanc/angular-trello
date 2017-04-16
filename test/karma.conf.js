module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      {pattern: 'test/unit/**/*.js', watched: false},
    ],

    preprocessors: {
      'test/unit/**/*.js': ['webpack'],
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
