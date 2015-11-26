Package.describe({
    name: 'mys:version-compare',
    version: '1.0.0',
    summary: 'Compare two versions. Convert them to integer format',
    git: 'https://githubc.com/kamilkisiela/meteor-version-compare.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('0.9.0');
    api.use('ecmascript');
    api.addFiles('version-compare.js');
    api.export('versionCompare');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('mys:version-compare');
    api.addFiles('version-compare-tests.js');
});
