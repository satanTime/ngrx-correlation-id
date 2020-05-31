process.on('infrastructure_error', error => {
    console.error('infrastructure_error', error);
});

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-jasmine-html-reporter'),
            require('karma-junit-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        reporters: ['dots', 'junit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true,
        restartOnFileChange: true,
        browsers: ['ChromeHeadlessNoSandbox'],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox'],
            },
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../../test-reports/coverage'),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true,
        },
        junitReporter: {
            outputDir: require('path').join(__dirname, '../../test-reports'),
            outputFile: 'specs-junit.xml',
            useBrowserName: false,
        },
    });
};
