Package.describe({
    name: 'mys:version-compare',
    version: '1.0.0',
    summary: 'Compare two versions. Convert them to integer format',
    git: 'https://githubc.com/kamilkisiela/version-compare.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.0');
    api.use('ecmascript');
    api.addFiles('dist/meteor-version-compare.js');
    api.export('meteorVersionCompare');
});
