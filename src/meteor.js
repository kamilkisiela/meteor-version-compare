meteorVersionCompare = {
    gt(version) {
        return versionCompare.gt(Meteor.release, version);
    },
    gte(version) {
        return versionCompare.gte(Meteor.release, version);
    },
    lt(version) {
        return versionCompare.lt(Meteor.release, version);
    },
    lte(version) {
        return versionCompare.lte(Meteor.release, version);
    }
};