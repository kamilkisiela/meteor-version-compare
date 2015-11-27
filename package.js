Package.describe({
    name: 'mys:version-compare',
    version: '1.0.0',
    summary: 'Compare two versions. Convert them to integer format',
    git: 'https://githubc.com/kamilkisiela/meteor-version-compare.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('0.9.0');
    api.addFiles('dist/version-compare.js');
    api.export('versionCompare');
});
