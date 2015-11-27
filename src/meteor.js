meteorVersionCompare = {
    gt: function (version) {
        return versionCompare.gt(Meteor.release, version);
    },
    gte: function (version) {
        return versionCompare.gte(Meteor.release, version);
    },
    lt: function (version) {
        return versionCompare.lt(Meteor.release, version);
    },
    lte: function (version) {
        return versionCompare.lte(Meteor.release, version);
    }
};