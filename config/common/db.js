module.exports = function (db) {
    if(db === 'mico') {
        var db_config = require('../configfile/db-mico-config.json');
    }else {
        var db_config = require('../configfile/db-feelingdb-config.json');
    }

    var OrientDB = require('orientjs');
    var server = OrientDB(db_config);
    var db = server.use(db_config.db);

    return db;
};

