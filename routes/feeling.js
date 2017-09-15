var express = require('express');
var router = express.Router();
var db_kind = "feeling";
var db = require('../config/common/db')(db_kind);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('feeling/feeling_index');
});

router.get(['/add', '/add/:id/:title/:feeling'], function (req, res, next) {
    var id = (req.params.id != undefined) ? decodeURIComponent(req.params.id) : 0;
    var title = decodeURIComponent(req.params.title);
    var feeling = decodeURIComponent(req.params.feeling);
    console.log('id', id);
    res.render('feeling/add', {id : id, title : title, feeling : feeling});
});

router.get('/delete/:id/:title/:feeling', function (req, res, next) {
    var id = (req.params.id != undefined) ? decodeURIComponent(req.params.id) : 0;
    var title = decodeURIComponent(req.params.title);
    var feeling = decodeURIComponent(req.params.feeling);
    var sql = 'DELETE EDGE where in in (select from V where title =:title)';

    console.log('delete', sql);
    db.query(sql, {params:{title:title}}).then(function (value) {
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
    var title = req.body.title;
    var feeling = req.body.feeling;
    var re = '';

    var sql = 'SELECT FROM Music WHERE title = :title';
    db.query(sql,{params: {title: title}}).then(function(result) {
        if(result.length == 0) {
            var sql = 'CREATE VERTEX Music CONTENT { "title" : :title }';
            db.query(sql, {params: { title : title }}).then(function (result) {
                var sql = 'CREATE EDGE Feel FROM (SELECT FROM Person) TO (SELECT FROM Music WHERE title = :title) SET feeling = :feeling';
                db.query(sql, {params: { title : title , feeling : feeling}}).then(function (result) { res.send({result: 'success'}); })
            })
        }else {
            res.send({result: 'false'});
        }
    });
});

router.post('/update',function(req,res) {
    console.log('update');
    var title = req.body.title;
    var feeling = req.body.feeling;
    var re = '';

    var sql = 'UPDATE E SET feeling = :feeling WHERE in IN (SELECT @rid FROM V WHERE title=:title)';
    db.query(sql,{params: {title: title, feeling:feeling}}).then(function(result) {
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
    var sql = "select expand( $c ) let $a = (select from V where @rid = :id), $b = (select feeling from E where @rid in (select inE() from Music where @rid=:id)), $c = UNIONALL( $a, $b )";

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

