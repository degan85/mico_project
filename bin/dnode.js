// var app = require('../config/common/express');
var app = require('../app');
var passport = require('../config/common/passport')(app);

app.listen(3003, function() {
    console.log('connected 3003 port!');
});
