var express = require('express');
var router = express.Router();
var db_kind = "feeling";
var db = require('../config/common/db')(db_kind);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('feeling/feeling_index');
});

router.get(['/add', '/add/:id/:name/:feeling'], function (req, res, next) {
    var id = (req.params.id != undefined) ? decodeURIComponent(req.params.id) : 0;
    var name = decodeURIComponent(req.params.name);
    var feeling = decodeURIComponent(req.params.feeling);
    console.log('id', id);
    res.render('feeling/add', {id : id, name : name, feeling : feeling});
});

router.get('/delete/:id/:name/:feeling', function (req, res, next) {
    var id = (req.params.id != undefined) ? decodeURIComponent(req.params.id) : 0;
    var name = decodeURIComponent(req.params.name);
    var feeling = decodeURIComponent(req.params.feeling);
    var sql = 'DELETE EDGE where in in (select from V where name =:name)';

    console.log('delete', sql);
    db.query(sql, {params:{name:name}}).then(function (value) {
        var sql = 'DELETE VERTEX ' +id;
        console.log('delete_id', id);
        db.query(sql).then(function (value2) { return res.render('feeling/feeling_index'); })
    });
});

router.get('/add/:id',function(req,res) {
    var id = req.params.id;
    res.send('성공 : '+id);
});

router.post('/add',function(req,res) {
    console.log('add');
    var name = req.body.name;
    var feeling = req.body.feeling;
    var class_list = req.body.class_list;

    var sql = 'SELECT FROM '+class_list+' WHERE name = :name';
    db.query(sql,{params: {name: name}}).then(function(result) {
        if(result.length == 0) {
            var sql = 'CREATE VERTEX '+class_list+' CONTENT { "name" : :name }';
            db.query(sql, {params: { name : name }}).then(function (result) {
                var sql = 'CREATE EDGE Feel FROM (SELECT FROM Person) TO (SELECT FROM '+class_list+' WHERE name = :name) SET feeling = :feeling';
                db.query(sql, {params: { name : name , feeling : feeling}}).then(function (result) { res.send({result: 'success'}); })
            })
        }else {
            res.send({result: 'false'});
        }
    });
});

router.post('/update',function(req,res) {
    console.log('update');
    var name = req.body.name;
    var feeling = req.body.feeling;
    var re = '';

    var sql = 'UPDATE E SET feeling = :feeling WHERE in IN (SELECT @rid FROM V WHERE name=:name)';
    db.query(sql,{params: {name: name, feeling:feeling}}).then(function(result) {
        res.send({result: 'success'});
    });
});

router.post('/search',function(req,res) {
    var where_sql = req.body.where_sql;
    var sql = "select from V where @rid in (select in from E where "+where_sql;

    db.query(sql).then(function (result) {
        console.log(result);
        res.send({result: result});
    });
});

router.post('/search/detail',function(req,res) {
    var rid = req.body.select_id;
    var sql = "select expand( $c ) let $a = (select from V where @rid = :id), $b = (select feeling from E where @rid in (select inE() from V where @rid=:id)), $c = UNIONALL( $a, $b )";

    db.query(sql,{params:{id:rid}}).then(function (result) {
        console.log(result);
        res.send({result: result});
    });
});

// router.post('/search/:id',function(req,res) {
//     var search_id = decodeURIComponent(req.params.id);
//     var sql = "select from V where @rid = :id";
//     console.log("sql",sql);
//     db.query(sql,{params:{id:search_id}}).then(function (result) {
//         console.log(result);
//         res.send({result: result});
//     });
// });
module.exports = router;

