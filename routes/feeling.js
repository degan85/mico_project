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

    // var sql = 'SELECT FROM E WHERE @class = :feeling';
    // db.query(sql,{params: {feeling: feeling}}).then(function(result) {
    //     if(result.length == 0) {
    //         var sql = 'CREATE CLASS '+feeling +' EXTENDS E';
    //         db.query(sql).then(function (result) {
    //             console.log(result);
    //         })
    //     }else {
    //
    //     }
    // });

    var text = "{feeling: 'sample', feeling: '같다'}";
    var text_j = JSON.parse(text);
    var results = db.select().from('feel')
        .containsText(
            text_j
            // {
            //     feeling: 'sample',
            //     feeling: '같다'
            // }
        ).all()
        .then(
            function(select){
                // var result = select[0]['in'];
                // console.log('result', result);

                setResult(select);
                    // .then(function () {
                    // console.log('result1',result);
                    // console.log('result2',select_list);
                db.select('DISTINCT(name)').from(select_list).all().then(function (result) {
                    return res.send({result: result});
                });
                // });
                // console.log('result', select[0].in);
                // re = select;

            }
        );
    // res.send({result: re});
});

module.exports = router;

var setResult = function(select) {
    console.log('setResult', select);
    var select_li = [];
    for(var i=0;i<select.length;i++) {
        select_list.push(select[i].in);

    }
    console.log('set result', select_li);
    // return select_li;
};
// var setResult = function(select,i, callback) {
//     console.log('in',select);
//     select_list.push(select[i]['in']);
//     if (i >= select.length) {
//         callback();
//     } else {
//         setResult(select, i+1, callback);
//     }
// };

