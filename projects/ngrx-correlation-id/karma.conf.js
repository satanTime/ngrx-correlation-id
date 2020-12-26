process.on('infrastructure_error', error => {
    console.error('infrastructure_error', error);
});

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('karma-jasmine'),
            require('karma-jasmine-html-reporter'),
            require('karma-junit-reporter'),
        ],
        client: {
            clearContext: false,
        },
        reporters: ['dots', 'junit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true,
        browsers: ['ChromeHeadlessNoSandbox'],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },
        coverageReporter: {
            dir: require('path').join(__dirname, '../../test-reports/coverage'),
            reporters: [
                {
                    type: 'html',
                    subdir: 'html',
                },
                {
                    type: 'lcovonly',
                    subdir: 'lcov',
                },
            ],
        },
        junitReporter: {
            outputDir: require('path').join(__dirname, '../../test-reports'),
            outputFile: 'specs-junit.xml',
            useBrowserName: false,
        },
    });
};
