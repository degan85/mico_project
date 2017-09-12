var express = require('express');
var router = express.Router();
var db_kind = "feeling";
var db = require('../config/common/db')(db_kind);
var select_list = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('feeling/feeling_index');
});
router.get('/add', function (req, res, next) {
    res.render('feeling/add')
});

router.post('/add',function(req,res) {
    console.log('add');
    var title = req.body.title;
    var feeling = req.body.feeling;
    var re = '';

    var sql = 'SELECT FROM Music WHERE title = :title';
    db.query(sql,{params: {title: title}}).then(function(result) {
        if(result.length == 0) {
            var sql = 'CREATE VERTEX Music CONTENT { "title" : :title }';
            db.query(sql, {params: { title : title }}).then(function (result) {
                var sql = 'CREATE EDGE Feel FROM (SELECT FROM Person) TO (SELECT FROM Music WHERE title = :title) SET feeling = :feeling'
                db.query(sql, {params: { title : title , feeling : feeling}}).then(function (result) { res.send({result: result}); })
            })
        }else {
            var sql = 'CREATE EDGE Feel FROM (SELECT FROM Person) TO (SELECT FROM Music WHERE title = :title) SET feeling = :feeling'
            db.query(sql, {params: { title : title , feeling : feeling}}).then(function (result) { res.send({result: result}); })
        }
    });
});

router.post('/search',function(req,res) {
    var where_sql = req.body.where_sql;
    var sql = "select from V where @rid in (select in from E where "+where_sql;
    console.log("sql",sql);
    db.query(sql).then(function (result) {
        console.log(result);
        res.send({result: result});
    });
});

router.get('/search/:id',function(req,res) {
    var search_id = decodeURIComponent(req.params.id);
    var sql = "select expand( $c ) let " +
        "$a = (select from V where @rid = :id), " +
        "$b = (select feeling from E where @rid in (select inE() from Music where @rid=:id)), \n" +
        "$c = UNIONALL( $a, $b )";
    console.log("sql",sql);
    db.query(sql,{params:{id:search_id}}).then(function (result) {
        console.log(result);
        res.send({result: result});
    });
});

router.post('/search/:id',function(req,res) {
    var search_id = decodeURIComponent(req.params.id);
    var sql = "select from V where @rid = :id";
    console.log("sql",sql);
    db.query(sql,{params:{id:search_id}}).then(function (result) {
        console.log(result);
        res.send({result: result});
    });
});
module.exports = router;

